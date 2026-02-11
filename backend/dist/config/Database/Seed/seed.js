import "reflect-metadata";
import { AppDataSource } from "../DBconfig.js";
import { Product } from "../Schemas/Product.js";
import { ProductVariant } from "../Schemas/Product_varient.js";
import { User } from "../Schemas/User.js";
import { Address } from "../Schemas/Adress.js";
async function seed() {
    try {
        await AppDataSource.initialize();
        console.log("📦 Database connected");
        const productRepo = AppDataSource.getRepository(Product);
        const variantRepo = AppDataSource.getRepository(ProductVariant);
        const userRepo = AppDataSource.getRepository(User);
        const addressRepo = AppDataSource.getRepository(Address);
        /* --------------------PRODUCTS-------------------- */
        const products = productRepo.create([
            {
                name: "Bleu de Noir",
                brand: "Maison Élégance",
                description: "A bold and refreshing fragrance with citrus top notes, a woody heart, and a smooth amber finish.",
                isActive: true,
                productImage: "p1.png",
                family: "Oriental Woody",
                gender: "Unisex",
                topNotes: "Saffron, Bergamot",
                heartNotes: "Rose, Patchouli",
                baseNotes: "Oud, Amber, Musk",
                longevity: "10 - 12 hours",
                sillage: "Heavy",
            },
            {
                name: "Velvet Rose Oud",
                brand: "Royal Scents",
                description: "A luxurious blend of deep rose, smoky oud, and warm spices for an intense evening scent.",
                isActive: true,
                productImage: "p2.png",
                family: "Oriental Woody",
                gender: "Unisex",
                topNotes: "Saffron, Bergamot",
                heartNotes: "Rose, Patchouli",
                baseNotes: "Oud, Amber, Musk",
                longevity: "10 - 12 hours",
                sillage: "Heavy",
            },
            {
                name: "Aqua Spirit",
                brand: "Oceanica",
                description: "Fresh aquatic notes combined with bergamot and musk, perfect for everyday wear.",
                isActive: true,
                productImage: "p3.png",
                family: "Floral Oud",
                gender: "Women",
                topNotes: "Lychee, Pink Pepper",
                heartNotes: "Turkish Rose, Peony",
                baseNotes: "Oud, Vanilla, Sandalwood",
                longevity: "8 - 10 hours",
                sillage: "Strong",
            },
            {
                name: "Amber Nights",
                brand: "Noir Atelier",
                description: "Warm amber, vanilla, and patchouli create a sensual and long-lasting fragrance.",
                isActive: true,
                productImage: "p4.png",
                family: "Floral Oud",
                gender: "Women",
                topNotes: "Lychee, Pink Pepper",
                heartNotes: "Turkish Rose, Peony",
                baseNotes: "Oud, Vanilla, Sandalwood",
                longevity: "8 - 10 hours",
                sillage: "Strong",
            },
            {
                name: "Citrus Bloom",
                brand: "Lumière Paris",
                description: "A vibrant burst of lemon, orange blossom, and neroli for a clean and uplifting scent.",
                isActive: true,
                productImage: "p4.png",
                family: "Fresh Aquatic",
                gender: "Men",
                topNotes: "Grapefruit, Lemon",
                heartNotes: "Marine, Lavender",
                baseNotes: "Cedarwood, White Musk",
                longevity: "6 - 8 hours",
                sillage: "Moderate",
            },
            {
                name: "Midnight Oud",
                brand: "Imperial Essence",
                description: "Rich oud layered with leather, incense, and dark woods for a powerful nocturnal fragrance.",
                isActive: true,
                productImage: "p5.png",
                family: "Fresh Aquatic",
                gender: "Men",
                topNotes: "Grapefruit, Lemon",
                heartNotes: "Marine, Lavender",
                baseNotes: "Cedarwood, White Musk",
                longevity: "6 - 8 hours",
                sillage: "Moderate",
            },
            {
                name: "Floral Whisper",
                brand: "Petale Maison",
                description: "Soft jasmine and peony blended with white musk for an elegant and delicate aroma.",
                isActive: true,
                productImage: "p6.png",
                family: "Amber Vanilla",
                gender: "Unisex",
                topNotes: "Mandarin, Cinnamon",
                heartNotes: "Amber, Labdanum",
                baseNotes: "Vanilla, Tonka Bean",
                longevity: "9 - 11 hours",
                sillage: "Moderate to Heavy",
            },
            {
                name: "Spice Route",
                brand: "Nomad Perfumes",
                description: "Exotic spices, cardamom, and sandalwood inspired by ancient trade routes.",
                isActive: true,
                productImage: "p1.png",
                family: "Amber Vanilla",
                gender: "Unisex",
                topNotes: "Mandarin, Cinnamon",
                heartNotes: "Amber, Labdanum",
                baseNotes: "Vanilla, Tonka Bean",
                longevity: "9 - 11 hours",
                sillage: "Moderate to Heavy",
            },
            {
                name: "Vanilla Sky",
                brand: "Cloud Nine",
                description: "Creamy vanilla and tonka bean wrapped in soft woods for a cozy, comforting scent.",
                isActive: true,
                productImage: "p2.png",
                family: "Amber Vanilla",
                gender: "Unisex",
                topNotes: "Mandarin, Cinnamon",
                heartNotes: "Amber, Labdanum",
                baseNotes: "Vanilla, Tonka Bean",
                longevity: "9 - 11 hours",
                sillage: "Moderate to Heavy",
            },
            {
                name: "Green Vetiver",
                brand: "Terra Botanica",
                description: "Earthy vetiver with fresh green notes and citrus accents for a natural, grounding feel.",
                isActive: true,
                productImage: "p3.png",
                family: "Amber Vanilla",
                gender: "Unisex",
                topNotes: "Mandarin, Cinnamon",
                heartNotes: "Amber, Labdanum",
                baseNotes: "Vanilla, Tonka Bean",
                longevity: "9 - 11 hours",
                sillage: "Moderate to Heavy",
            },
            {
                name: "Solar Musk",
                brand: "Aurora Fragrances",
                description: "Radiant musk combined with warm florals and amber, evoking sun-kissed skin.",
                isActive: true,
                productImage: "p4.png",
                family: "Fresh Aquatic",
                gender: "Men",
                topNotes: "Grapefruit, Lemon",
                heartNotes: "Marine, Lavender",
                baseNotes: "Cedarwood, White Musk",
                longevity: "6 - 8 hours",
                sillage: "Moderate",
            },
        ]);
        const savedProducts = await productRepo.save(products);
        console.log("✅ Products seeded");
        /* -------------------- USERS -------------------- */
        const users = userRepo.create([
            {
                name: "Kishore",
                email: "kishore@test.com",
                password: "password123",
            },
            {
                name: "Amit",
                email: "amit@test.com",
                password: "password123",
            },
            {
                name: "Rahul",
                email: "rahul@test.com",
                password: "password123",
            },
            {
                name: "Sneha",
                email: "sneha@test.com",
                password: "password123",
            },
            {
                name: "Priya",
                email: "priya@test.com",
                password: "password123",
            },
        ]);
        const savedUser = await userRepo.save(users);
        console.log("✅ Users seeded");
        // --------------------ADDRESS------------------------
        const address = addressRepo.create([
            {
                user: savedUser[0],
                line1: "12 MG Road",
                city: "Bangalore",
                state: "Karnataka",
                pincode: "560001",
                country: "India",
            },
            {
                user: savedUser[0],
                line1: "12 MG Road",
                city: "Bangalore",
                state: "Karnataka",
                pincode: "560001",
                country: "India",
            },
        ]);
        await addressRepo.save(address);
        console.log("Address seeded");
        /* -------------------- VARIANTS -------------------- */
        const variants = variantRepo.create([
            {
                product: savedProducts[0],
                size: "50ml",
                price: 3499.0,
                stock: 40,
                varientName: "Midnight Oud 50ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            {
                product: savedProducts[0],
                size: "100ml",
                price: 5999.0,
                stock: 25,
                varientName: "Midnight Oud 100ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            // Velvet Rose Oud
            {
                product: savedProducts[1],
                size: "50ml",
                price: 4999.0,
                stock: 30,
                varientName: "Velvet Rose Oud 50ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            {
                product: savedProducts[1],
                size: "100ml",
                price: 8499.0,
                stock: 15,
                varientName: "Velvet Rose Oud 100ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            // Aqua Spirit
            {
                product: savedProducts[2],
                size: "50ml",
                price: 2999.0,
                stock: 60,
                varientName: "Aqua Spirit 50ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            {
                product: savedProducts[2],
                size: "100ml",
                price: 4999.0,
                stock: 35,
                varientName: "Aqua Spirit 100ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            // Amber Nights
            {
                product: savedProducts[3],
                size: "50ml",
                price: 4599.0,
                stock: 20,
                varientName: "Amber Nights 50ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
            {
                product: savedProducts[3],
                size: "100ml",
                price: 7899.0,
                stock: 10,
                varientName: "Amber Nights 100ml",
                about: "At our house of fragrance, we believe perfume is more than an accessory — it is a memory, a mood, and a silent signature that speaks long after you’ve left the room. Every bottle we craft is a balance of artistry and chemistry, designed to evoke emotion, confidence, and timeless elegance.",
            },
        ]);
        await variantRepo.save(variants);
        console.log("✅ Product variants seeded");
        console.log("🎉 Seeding completed successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding failed", error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map