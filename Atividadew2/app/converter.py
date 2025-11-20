import pandas as pd
import os

def parse_input_file(path: str):
    """
    Tenta ler CSV com coluna 'value', caso contrário lê como texto 
    com uma entrada por linha.
    Retorna lista de strings (valores brutos).
    """
    _, ext = os.path.splitext(path)
    ext = ext.lower()
    values = []
    try:
        if ext == ".csv":
            df = pd.read_csv(path, dtype=str, keep_default_na=False)
            if "value" in df.columns:
                values = df["value"].astype(str).tolist()
            else:
                # assumir primeira coluna
                values = df.iloc[:, 0].astype(str).tolist()
        else:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                values = [line.strip() for line in f if line.strip() != ""]
    except Exception:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            values = [line.strip() for line in f if line.strip() != ""]

    return values


def convert_value_to_bases(value_str: str, from_base: int):
    """
    Converte um valor (string) presumindo base 'from_base' para decimal, bin, oct, hex.
    Retorna dict com campos.
    """
    try:
        dec = int(value_str, from_base)
    except Exception:
        return {
            "input": value_str,
            "valid": False,
            "decimal": None,
            "binary": None,
            "octal": None,
            "hex": None
        }
    return {
        "input": value_str,
        "valid": True,
        "decimal": str(dec),
        "binary": bin(dec)[2:],
        "octal": oct(dec)[2:],
        "hex": hex(dec)[2:].upper()
    }


def process_input_file(input_path: str, output_csv: str, output_json: str, from_base: int = 10):
    values = parse_input_file(input_path)
    rows = [convert_value_to_bases(v, from_base) for v in values]
    df = pd.DataFrame(rows)
    df.to_csv(output_csv, index=False)
    df.to_json(output_json, orient="records", force_ascii=False)
    return output_csv, output_json
