
import json

# Charge les plats actuels
with open("plats.json", encoding="utf-8") as f:
    plats = json.load(f)

start_index = len(plats) + 1
nombre_a_ajouter = 102

categories = ["dessert", "plat", "entrée", "boisson", "snack"]

for i in range(nombre_a_ajouter):
    nouveau_plat = {
        "nom": f"Plat factice {start_index + i}",
        "categorie": categories[i % len(categories)],
        "image": f"image_{start_index + i}.jpg",
        "image_url": f"https://example.com/image_{start_index + i}.jpg"
    }
    plats.append(nouveau_plat)

# Sauvegarde dans un nouveau fichier pour éviter d’écraser
with open("plats_augmente.json", "w", encoding="utf-8") as f:
    json.dump(plats, f, indent=4, ensure_ascii=False)

print(f"Fichier avec {len(plats)} plats créé : plats_augmente.json")
