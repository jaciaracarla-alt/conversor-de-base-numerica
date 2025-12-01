import pandas as pd

def convert_number(value, base):
    try:
        number = int(str(value), base)
        return {
            "decimal": number,
            "bin": bin(number)[2:],
            "oct": oct(number)[2:],
            "hex": hex(number)[2:].upper(),
        }
    except:
        return {
            "decimal": "erro",
            "bin": "erro",
            "oct": "erro",
            "hex": "erro",
        }

def process_input_file(input_path, output_csv, output_json, from_base=10):
    df = pd.read_csv(input_path, header=None, names=["value"])

    df["decimal"] = df["value"].apply(lambda x: convert_number(x, from_base)["decimal"])
    df["bin"] = df["value"].apply(lambda x: convert_number(x, from_base)["bin"])
    df["oct"] = df["value"].apply(lambda x: convert_number(x, from_base)["oct"])
    df["hex"] = df["value"].apply(lambda x: convert_number(x, from_base)["hex"])

    df.to_csv(output_csv, index=False)
    df.to_json(output_json, orient="records", indent=4)
