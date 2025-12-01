from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import uuid
from converter import process_input_file   # corrigido: sem ponto

app = FastAPI(title="Conversor de Bases Numéricas")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Templates
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

# Arquivos estáticos
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")


@app.get("/", response_class=HTMLResponse)
def front(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Diretórios de upload e saída
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
OUT_DIR = os.path.join(BASE_DIR, "out")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    from_base: int = Form(10)
):
    uid = str(uuid.uuid4())
    filename = f"{uid}_{file.filename}"
    input_path = os.path.join(UPLOAD_DIR, filename)

    with open(input_path, "wb") as f:
        f.write(await file.read())

    output_csv = os.path.join(OUT_DIR, f"{uid}_output.csv")
    output_json = os.path.join(OUT_DIR, f"{uid}_output.json")

    process_input_file(input_path, output_csv, output_json, from_base=from_base)

    return {
        "message": "Arquivo processado!",
        "csv": f"/download/csv/{os.path.basename(output_csv)}",
        "json": f"/download/json/{os.path.basename(output_json)}",
    }

@app.get("/download/csv/{name}")
def download_csv(name: str):
    path = os.path.join(OUT_DIR, name)
    return FileResponse(path, media_type="text/csv", filename=name)

@app.get("/download/json/{name}")
def download_json(name: str):
    path = os.path.join(OUT_DIR, name)
    return FileResponse(path, media_type="application/json", filename=name)

