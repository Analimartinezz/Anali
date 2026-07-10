import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array
import numpy as np
import os
import sys

# --- Cargar modelo ---
model_path = "modelo_cnn.h5"
if not os.path.exists(model_path):
    print(f"ERROR: No se encuentra el modelo en '{model_path}'")
    sys.exit(1)
    
model = tf.keras.models.load_model(model_path)
print("Modelo cargado. Input shape:", model.input_shape)

class_names = ["manzana", "naranja", "pera", "platano"]   
# --- Pedir ruta ---
raw_path = input("Escribe la ruta de la imagen: ").strip()
# Limpiar comillas
if (raw_path.startswith('"') and raw_path.endswith('"')) or \
   (raw_path.startswith("'") and raw_path.endswith("'")):
    raw_path = raw_path[1:-1]
img_path = raw_path.replace('\\', '/')

if not os.path.exists(img_path):
    print(f"ERROR: No se encuentra la imagen en '{img_path}'")
    sys.exit(1)

# --- Procesar imagen ---
try:
    img = load_img(img_path, target_size=(128, 128))
    img_array = img_to_array(img)          # valores entre 0 y 255
    img_array = np.expand_dims(img_array, axis=0)
except Exception as e:
    print("Error al procesar la imagen:", e)
    sys.exit(1)

# --- Predicción con todas las probabilidades ---
pred = model.predict(img_array)
print("\nProbabilidades por clase:")
for i, nombre in enumerate(class_names):
    print(f"{nombre}: {pred[0][i]*100:.2f}%")

clase = np.argmax(pred)
confianza = np.max(pred)
print(f"\nResultado final: {class_names[clase]}")
print(f"Confianza: {confianza * 100:.2f}%")