        async function fetchProductData() {
            let barcode = document.getElementById("barcode").value;
            if (!barcode) return;

            try {
                let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
                let data = await response.json();
                let resultDiv = document.getElementById("result");
                
                if (data.status === 1) {
                    let product = data.product;
                    let country = product.countries_tags?.includes("en:united-states") ? "USA" : "Other";
                    resultDiv.innerHTML = `
                        <p>${country === "USA" ? "✅ This product is Made in the USA!" : "❌ This product is NOT made in the USA."}</p>
                        <p>Barcode: ${barcode}</p>
                        <p>Company: ${product.brands || "Unknown"}</p>
                        <p>Location: ${country}</p>`;
                    resultDiv.className = `result ${country === "USA" ? "success" : "fail"}`;
                    resultDiv.style.display = "block";
                } else {
                    resultDiv.innerHTML = "Product not found.";
                    resultDiv.className = "result fail";
                    resultDiv.style.display = "block";
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }

        function openModal() {
            document.getElementById("modal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("modal").style.display = "none";
        }
