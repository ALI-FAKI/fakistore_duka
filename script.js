// FakiStore Duka – Mfumo Kamili (Bidhaa, Hisa, Mauzo, Gharama, Mikopo)

document.addEventListener('DOMContentLoaded', () => {
    // ─── DOM Elements ───
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const langToggleBtn = document.getElementById('lang-toggle');
    const productsListEl = document.getElementById('products-list');
    const productsEmptyEl = document.getElementById('products-empty');
    const stockInListEl = document.getElementById('stock-in-list');
    const stockInEmptyEl = document.getElementById('stock-in-empty');
    const salesListEl = document.getElementById('sales-list');
    const salesEmptyEl = document.getElementById('sales-empty');
    const expensesListEl = document.getElementById('expenses-list');
    const expensesEmptyEl = document.getElementById('expenses-empty');
    const lowStockListEl = document.getElementById('low-stock-list');
    const noAlertsEl = document.getElementById('no-alerts');

    // Product form inputs
    const productNameInput = document.getElementById('product-name');
    const retailUnitInput = document.getElementById('retail-unit');
    const bulkUnitInput = document.getElementById('bulk-unit');
    const conversionInput = document.getElementById('conversion');
    const buyPriceBulkInput = document.getElementById('buy-price-bulk');
    const sellPriceRetailInput = document.getElementById('sell-price-retail');
    const sellPriceBulkInput = document.getElementById('sell-price-bulk');
    const initialStockInput = document.getElementById('initial-stock');
    const expectedProfitDisplay = document.getElementById('expected-profit-display');
    const addProductBtn = document.getElementById('add-product-btn');

    // Stock In inputs
    const stockInProductSelect = document.getElementById('stock-in-product');
    const stockInBulkQtyInput = document.getElementById('stock-in-bulk-qty');
    const stockInCostInput = document.getElementById('stock-in-cost');
    const addStockInBtn = document.getElementById('add-stock-in-btn');

    // Sales inputs
    const saleProductSelect = document.getElementById('sale-product');
    const saleQtyInput = document.getElementById('sale-qty');
    const salePriceInput = document.getElementById('sale-price');
    const addSaleBtn = document.getElementById('add-sale-btn');
    const retailSaleBtn = document.getElementById('retail-sale-btn');
    const bulkSaleBtn = document.getElementById('bulk-sale-btn');
    let saleType = 'retail';

    // Expense inputs
    const expenseDescInput = document.getElementById('expense-desc');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategorySelect = document.getElementById('expense-category');
    const addExpenseBtn = document.getElementById('add-expense-btn');

    // Loan inputs
    const debtorNameInput = document.getElementById('debtor-name');
    const debtorPhoneInput = document.getElementById('debtor-phone');
    const loanAmountInput = document.getElementById('loan-amount');
    const addLoanBtn = document.getElementById('add-loan-btn');
    const repaymentDebtorSelect = document.getElementById('repayment-debtor');
    const repaymentAmountInput = document.getElementById('repayment-amount');
    const addRepaymentBtn = document.getElementById('add-repayment-btn');
    const debtorsListEl = document.getElementById('debtors-list');
    const debtorsEmptyEl = document.getElementById('debtors-empty');
    const totalLoansEl = document.getElementById('total-loans');

    // Summary elements
    const todaySalesEl = document.getElementById('today-sales');
    const todayExpensesEl = document.getElementById('today-expenses');
    const todayProfitEl = document.getElementById('today-profit');
    const stockValueEl = document.getElementById('stock-value');

    // State
    let products = [];
    let stockIns = [];
    let sales = [];
    let expenses = [];
    let debtors = []; // array of {id, name, phone, totalLoan, totalRepaid}
    let currentLanguage = 'sw';
    let editingProductId = null;

    // ─── Translations (added new keys for loans and edit) ───
    const translations = {
        sw: {
            app_name: 'FakiStore Duka',
            app_tagline: 'Mfumo wa bidhaa, hisa, mauzo, gharama na mikopo.',
            nav_dashboard: 'Dashibodi',
            nav_products: 'Bidhaa',
            nav_stock_in: 'Ingiza Hisa',
            nav_sales: 'Mauzo',
            nav_expenses: 'Gharama',
            nav_loans: 'Mikopo',
            dash_summary: 'Muhtasari wa Leo',
            dash_sales: 'Mapato ya Mauzo',
            dash_expenses: 'Gharama',
            dash_profit: 'Faida',
            dash_stock_value: 'Thamani ya Hisa',
            dash_loans: 'Deni Lote la Mikopo',
            dash_low_stock: 'Bidhaa Zenye Hisa Chache',
            no_low_stock: 'Hakuna bidhaa zenye hisa chache.',
            products_title: 'Bidhaa',
            add_product: 'Ongeza Bidhaa',
            update_product: 'Sasisha Bidhaa',
            edit: 'Hariri',
            ph_product_name: 'Jina la bidhaa',
            retail_unit: 'Kizio cha rejareja (kg, lita, kipande)',
            bulk_unit: 'Kizio cha jumla (mfuko, katoni)',
            conversion: 'Vizio vya rejareja kwa kizio cha jumla',
            buy_price_bulk: 'Bei ya kununua kwa kizio cha jumla',
            sell_price_retail: 'Bei ya kuuza kwa kizio cha rejareja',
            sell_price_bulk: 'Bei ya kuuza kwa kizio cha jumla (hiari)',
            initial_stock: 'Hisa ya kwanza (rejareja)',
            expected_profit: 'Faida Inayotarajiwa (kwa unit na jumla)',
            product_list: 'Orodha ya Bidhaa',
            no_products: 'Hakuna bidhaa bado.',
            stock_in_title: 'Ingiza Hisa',
            add_stock: 'Ongeza Hisa',
            ph_bulk_qty: 'Idadi ya vizio vya jumla (mfuko)',
            ph_cost_bulk: 'Gharama kwa kizio cha jumla',
            recent_stock_in: 'Hisa Zilizoingia Hivi Karibuni',
            no_stock_in: 'Hakuna hisa zilizoingia bado.',
            sales_title: 'Rekodi Mauzo',
            sale_retail: 'Rejareja',
            sale_bulk: 'Jumla',
            record_sale: 'Rekodi Mauzo',
            ph_qty: 'Kiasi',
            ph_sale_price: 'Bei',
            recent_sales: 'Mauzo ya Hivi Karibuni',
            no_sales: 'Hakuna mauzo bado.',
            expenses_title: 'Gharama',
            add_expense: 'Ongeza',
            ph_expense_desc: 'Maelezo (mfano: Kodi)',
            ph_amount: 'Kiasi',
            cat_rent: 'Kodi', cat_transport: 'Usafiri', cat_electricity: 'Umeme',
            cat_water: 'Maji', cat_staff: 'Wafanyakazi', cat_other: 'Nyingine',
            recent_expenses: 'Gharama za Hivi Karibuni',
            no_expenses: 'Hakuna gharama bado.',
            loans_title: 'Mikopo',
            debtor_name: 'Jina la mkopaji',
            debtor_phone: 'Simu (hiari)',
            loan_amount: 'Kiasi cha mkopo',
            add_loan: 'Ongeza Mkopo',
            repayment_title: 'Rekodi Malipo',
            ph_repay_amount: 'Kiasi cha malipo',
            add_repayment: 'Rekodi Malipo',
            debtors_list: 'Orodha ya Wadeni',
            no_debtors: 'Hakuna wadeni bado.',
            sponsored_by: 'Imedhaminiwa na',
            fakistore_tagline: '– Jukwaa la kuaminika la ununuzi mtandaoni Tanzania',
            visit_fakistore: 'Tembelea FakiStore',
            footer_note: 'Data huhifadhiwa kiotomatiki kwenye kivinjari chako. Imedhaminiwa na FakiStore.'
        },
        en: {
            app_name: 'FakiStore Duka',
            app_tagline: 'Product, stock, sales, expenses and loans management system.',
            nav_dashboard: 'Dashboard',
            nav_products: 'Products',
            nav_stock_in: 'Stock In',
            nav_sales: 'Sales',
            nav_expenses: 'Expenses',
            nav_loans: 'Loans',
            dash_summary: "Today's Summary",
            dash_sales: 'Sales Revenue',
            dash_expenses: 'Expenses',
            dash_profit: 'Profit',
            dash_stock_value: 'Stock Value',
            dash_loans: 'Total Loan Debt',
            dash_low_stock: 'Low Stock Products',
            no_low_stock: 'No low stock products.',
            products_title: 'Products',
            add_product: 'Add Product',
            update_product: 'Update Product',
            edit: 'Edit',
            ph_product_name: 'Product name',
            retail_unit: 'Retail unit (kg, litre, piece)',
            bulk_unit: 'Bulk unit (bag, carton)',
            conversion: 'Retail units per bulk unit',
            buy_price_bulk: 'Buying price per bulk unit',
            sell_price_retail: 'Selling price per retail unit',
            sell_price_bulk: 'Selling price per bulk unit (optional)',
            initial_stock: 'Initial stock (retail units)',
            expected_profit: 'Expected Profit (per unit and total)',
            product_list: 'Product List',
            no_products: 'No products yet.',
            stock_in_title: 'Record Stock In',
            add_stock: 'Add Stock',
            ph_bulk_qty: 'Bulk quantity (bags)',
            ph_cost_bulk: 'Cost per bulk unit',
            recent_stock_in: 'Recent Stock In',
            no_stock_in: 'No stock added yet.',
            sales_title: 'Record Sale',
            sale_retail: 'Retail',
            sale_bulk: 'Bulk',
            record_sale: 'Record Sale',
            ph_qty: 'Quantity',
            ph_sale_price: 'Price',
            recent_sales: 'Recent Sales',
            no_sales: 'No sales recorded yet.',
            expenses_title: 'Record Expense',
            add_expense: 'Add',
            ph_expense_desc: 'Description (e.g., Rent)',
            ph_amount: 'Amount',
            cat_rent: 'Rent', cat_transport: 'Transport', cat_electricity: 'Electricity',
            cat_water: 'Water', cat_staff: 'Staff', cat_other: 'Other',
            recent_expenses: 'Recent Expenses',
            no_expenses: 'No expenses recorded yet.',
            loans_title: 'Loans',
            debtor_name: 'Debtor name',
            debtor_phone: 'Phone (optional)',
            loan_amount: 'Loan amount',
            add_loan: 'Add Loan',
            repayment_title: 'Record Repayment',
            ph_repay_amount: 'Repayment amount',
            add_repayment: 'Record Repayment',
            debtors_list: 'Debtors List',
            no_debtors: 'No debtors yet.',
            sponsored_by: 'Sponsored by',
            fakistore_tagline: "– Tanzania's trusted online shopping platform",
            visit_fakistore: 'Visit FakiStore',
            footer_note: 'Data saved automatically in your browser. Sponsored by FakiStore.'
        }
    };

    function applyLanguage(lang) {
        currentLanguage = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.textContent = translations[lang][key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });
        langToggleBtn.textContent = lang === 'sw' ? 'English' : 'Kiswahili';
        localStorage.setItem('fakistoreDuka_lang', lang);
        renderDynamicContent();
    }

    function renderDynamicContent() {
        renderProducts();
        renderStockIns();
        renderSales();
        renderExpenses();
        renderDebtors();
        updateDashboard();
        updateProductSelects();
        updateRepaymentSelect();
    }

    langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLanguage === 'sw' ? 'en' : 'sw');
    });

    // ─── localStorage Keys ───
    const PRODUCTS_KEY = 'fakistoreDuka_products';
    const STOCK_IN_KEY = 'fakistoreDuka_stockIns';
    const SALES_KEY = 'fakistoreDuka_sales';
    const EXPENSES_KEY = 'fakistoreDuka_expenses';
    const DEBTORS_KEY = 'fakistoreDuka_debtors';
    const LANG_KEY = 'fakistoreDuka_lang';

    function loadState() {
        const savedLang = localStorage.getItem(LANG_KEY);
        if (savedLang && (savedLang === 'sw' || savedLang === 'en')) currentLanguage = savedLang;
        const savedProducts = localStorage.getItem(PRODUCTS_KEY);
        if (savedProducts) { try { products = JSON.parse(savedProducts); } catch(e){} }
        const savedStockIns = localStorage.getItem(STOCK_IN_KEY);
        if (savedStockIns) { try { stockIns = JSON.parse(savedStockIns); } catch(e){} }
        const savedSales = localStorage.getItem(SALES_KEY);
        if (savedSales) { try { sales = JSON.parse(savedSales); } catch(e){} }
        const savedExpenses = localStorage.getItem(EXPENSES_KEY);
        if (savedExpenses) { try { expenses = JSON.parse(savedExpenses); } catch(e){} }
        const savedDebtors = localStorage.getItem(DEBTORS_KEY);
        if (savedDebtors) { try { debtors = JSON.parse(savedDebtors); } catch(e){} }
    }

    function saveState() {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        localStorage.setItem(STOCK_IN_KEY, JSON.stringify(stockIns));
        localStorage.setItem(SALES_KEY, JSON.stringify(sales));
        localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
        localStorage.setItem(DEBTORS_KEY, JSON.stringify(debtors));
        localStorage.setItem(LANG_KEY, currentLanguage);
    }

    // ─── Tab Switching ───
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });

    // ─── Expected Profit Calculation (live) ───
    function updateExpectedProfit() {
        const conversion = parseFloat(conversionInput.value);
        const costBulk = parseFloat(buyPriceBulkInput.value);
        const sellRetail = parseFloat(sellPriceRetailInput.value);
        const initialStock = parseFloat(initialStockInput.value) || 0;
        if (conversion && costBulk && sellRetail) {
            const costPerRetail = costBulk / conversion;
            const profitPerUnit = sellRetail - costPerRetail;
            const totalProfit = profitPerUnit * initialStock;
            expectedProfitDisplay.textContent = `TSh ${profitPerUnit.toFixed(2)} / unit | Jumla: TSh ${totalProfit.toFixed(2)}`;
        } else {
            expectedProfitDisplay.textContent = 'TSh 0';
        }
    }

    [conversionInput, buyPriceBulkInput, sellPriceRetailInput, initialStockInput].forEach(input => {
        input.addEventListener('input', updateExpectedProfit);
    });

    // ─── Product Functions ───
    function addOrUpdateProduct() {
        const name = productNameInput.value.trim();
        const retailUnit = retailUnitInput.value.trim() || 'kg';
        const bulkUnit = bulkUnitInput.value.trim() || 'bag';
        const conversion = parseFloat(conversionInput.value);
        const buyPriceBulk = parseFloat(buyPriceBulkInput.value);
        const sellPriceRetail = parseFloat(sellPriceRetailInput.value);
        const sellPriceBulk = parseFloat(sellPriceBulkInput.value) || null;
        const initialStock = parseFloat(initialStockInput.value) || 0;

        if (!name || !conversion || !buyPriceBulk || !sellPriceRetail) {
            alert(currentLanguage === 'sw' ? 'Tafadhali jaza sehemu zote za lazima.' : 'Please fill all required fields.');
            return;
        }

        if (editingProductId) {
            // Update existing product
            const product = products.find(p => p.id === editingProductId);
            if (product) {
                product.name = name;
                product.retailUnit = retailUnit;
                product.bulkUnit = bulkUnit;
                product.conversion = conversion;
                product.buyPriceBulk = buyPriceBulk;
                product.sellPriceRetail = sellPriceRetail;
                product.sellPriceBulk = sellPriceBulk;
                // Note: buying price change will not recalc costPerRetail from stock-ins; keep simple:
                // we update costPerRetail = buyPriceBulk / conversion (overwrites average)
                product.costPerRetail = buyPriceBulk / conversion;
                // Initial stock is ignored on edit; keep stock unchanged
            }
            editingProductId = null;
            addProductBtn.textContent = translations[currentLanguage].add_product;
        } else {
            const costPerRetail = buyPriceBulk / conversion;
            products.push({
                id: Date.now(),
                name, retailUnit, bulkUnit, conversion,
                buyPriceBulk, sellPriceRetail, sellPriceBulk,
                costPerRetail,
                stock: initialStock
            });
        }

        saveState();
        clearProductForm();
        renderProducts();
        updateProductSelects();
        updateDashboard();
    }

    function clearProductForm() {
        productNameInput.value = '';
        retailUnitInput.value = '';
        bulkUnitInput.value = '';
        conversionInput.value = '';
        buyPriceBulkInput.value = '';
        sellPriceRetailInput.value = '';
        sellPriceBulkInput.value = '';
        initialStockInput.value = '';
        expectedProfitDisplay.textContent = 'TSh 0';
        addProductBtn.textContent = translations[currentLanguage].add_product;
        editingProductId = null;
        // Enable all inputs (they might be disabled)
        [productNameInput, retailUnitInput, bulkUnitInput, conversionInput, buyPriceBulkInput, sellPriceRetailInput, sellPriceBulkInput, initialStockInput].forEach(el => el.disabled = false);
    }

    function editProduct(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        editingProductId = productId;
        productNameInput.value = product.name;
        retailUnitInput.value = product.retailUnit;
        bulkUnitInput.value = product.bulkUnit;
        conversionInput.value = product.conversion;
        buyPriceBulkInput.value = product.buyPriceBulk;
        sellPriceRetailInput.value = product.sellPriceRetail;
        sellPriceBulkInput.value = product.sellPriceBulk || '';
        initialStockInput.value = product.stock; // show current stock, not editable
        // Disable all fields except selling prices (and maybe name)
        [productNameInput, retailUnitInput, bulkUnitInput, conversionInput, buyPriceBulkInput, initialStockInput].forEach(el => el.disabled = true);
        sellPriceRetailInput.disabled = false;
        sellPriceBulkInput.disabled = false;
        addProductBtn.textContent = translations[currentLanguage].update_product;
        updateExpectedProfit();
    }

    addProductBtn.addEventListener('click', addOrUpdateProduct);

    function renderProducts() {
        productsListEl.innerHTML = '';
        if (products.length === 0) {
            productsEmptyEl.style.display = 'block';
        } else {
            productsEmptyEl.style.display = 'none';
        }
        products.forEach(product => {
            const item = document.createElement('div');
            item.className = 'list-item';
            const profitPerUnit = product.sellPriceRetail - product.costPerRetail;
            item.innerHTML = `
                <div>
                    <strong>${product.name}</strong>
                    <div style="font-size:0.85rem; color:#64748b;">
                        1 ${product.bulkUnit} = ${product.conversion} ${product.retailUnit} |
                        ${currentLanguage === 'sw' ? 'Nunua' : 'Buy'}: TSh ${product.buyPriceBulk}/${product.bulkUnit} |
                        ${currentLanguage === 'sw' ? 'Uza' : 'Sell'}: TSh ${product.sellPriceRetail}/${product.retailUnit}
                        ${product.sellPriceBulk ? `| ${currentLanguage === 'sw' ? 'Jumla' : 'Bulk'}: TSh ${product.sellPriceBulk}/${product.bulkUnit}` : ''}
                    </div>
                    <div style="font-size:0.85rem; color:#16a34a;">
                        ${currentLanguage === 'sw' ? 'Faida kwa' : 'Profit per'} ${product.retailUnit}: TSh ${profitPerUnit.toFixed(2)}
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:600;">${currentLanguage === 'sw' ? 'Hisa' : 'Stock'}: ${product.stock} ${product.retailUnit}</div>
                    <div class="product-actions">
                        <button class="edit-btn" data-product-id="${product.id}">${translations[currentLanguage].edit}</button>
                        <button class="delete-btn" data-product-id="${product.id}" style="background:none;border:none;color:#b91c1c;cursor:pointer;">✕</button>
                    </div>
                </div>
            `;
            productsListEl.appendChild(item);
        });

        productsListEl.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.productId);
                editProduct(id);
            });
        });

        productsListEl.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.productId);
                products = products.filter(p => p.id !== id);
                saveState();
                renderProducts();
                updateProductSelects();
                updateDashboard();
            });
        });
    }

    // ─── Stock In Functions (same as previous) ───
    function updateProductSelects() {
        const selects = [stockInProductSelect, saleProductSelect];
        selects.forEach(select => {
            select.innerHTML = '';
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = `${product.name} (${currentLanguage === 'sw' ? 'Hisa' : 'Stock'}: ${product.stock} ${product.retailUnit})`;
                select.appendChild(option);
            });
        });
        // Pre-fill sale price if products exist
        if (saleProductSelect.options.length > 0) {
            saleProductSelect.value = saleProductSelect.options[0].value;
            updateSalePriceForProduct();
        } else {
            salePriceInput.value = '';
        }
    }

    function addStockIn() {
        const productId = parseInt(stockInProductSelect.value);
        const bulkQty = parseFloat(stockInBulkQtyInput.value);
        const costPerBulk = parseFloat(stockInCostInput.value);

        if (!productId || !bulkQty || !costPerBulk) {
            alert(currentLanguage === 'sw' ? 'Tafadhali chagua bidhaa, kiasi na gharama.' : 'Please select product, quantity, and cost.');
            return;
        }

        const product = products.find(p => p.id === productId);
        if (!product) return;

        const retailQty = bulkQty * product.conversion;
        const totalCost = bulkQty * costPerBulk;
        const oldStockValue = product.stock * product.costPerRetail;
        const newStock = product.stock + retailQty;
        product.costPerRetail = (oldStockValue + totalCost) / newStock;
        product.stock = newStock;

        stockIns.push({
            id: Date.now(),
            productId,
            productName: product.name,
            bulkQty,
            costPerBulk,
            totalCost,
            date: new Date().toISOString()
        });

        saveState();
        stockInBulkQtyInput.value = '';
        stockInCostInput.value = '';
        renderStockIns();
        updateProductSelects();
        renderProducts();
        updateDashboard();
    }

    addStockInBtn.addEventListener('click', addStockIn);

    function renderStockIns() {
        stockInListEl.innerHTML = '';
        if (stockIns.length === 0) {
            stockInEmptyEl.style.display = 'block';
        } else {
            stockInEmptyEl.style.display = 'none';
        }
        stockIns.slice().reverse().slice(0, 10).forEach(stockIn => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div>
                    <strong>${stockIn.productName}</strong>
                    <div>${stockIn.bulkQty} × ${stockIn.costPerBulk} = TSh ${stockIn.totalCost}</div>
                </div>
                <div style="font-weight:600;">TSh ${stockIn.totalCost}</div>
            `;
            stockInListEl.appendChild(item);
        });
    }

    // ─── Sales Functions (same) ───
    function setSaleType(type) {
        saleType = type;
        retailSaleBtn.classList.toggle('active', type === 'retail');
        bulkSaleBtn.classList.toggle('active', type === 'bulk');
        updateSalePriceForProduct();
    }

    function updateSalePriceForProduct() {
        const productId = parseInt(saleProductSelect.value);
        const product = products.find(p => p.id === productId);
        if (!product) return;
        if (saleType === 'retail') {
            salePriceInput.value = product.sellPriceRetail;
        } else {
            if (product.sellPriceBulk) {
                salePriceInput.value = product.sellPriceBulk;
            } else {
                salePriceInput.value = '';
                alert(currentLanguage === 'sw' ? 'Bidhaa hii haina bei ya jumla. Tumia rejareja.' : 'This product has no bulk price. Use retail.');
                setSaleType('retail');
            }
        }
    }

    retailSaleBtn.addEventListener('click', () => setSaleType('retail'));
    bulkSaleBtn.addEventListener('click', () => setSaleType('bulk'));
    saleProductSelect.addEventListener('change', updateSalePriceForProduct);

    function recordSale() {
        const productId = parseInt(saleProductSelect.value);
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const qty = parseFloat(saleQtyInput.value);
        const price = parseFloat(salePriceInput.value);
        if (!qty || !price) {
            alert(currentLanguage === 'sw' ? 'Ingiza kiasi na bei.' : 'Enter quantity and price.');
            return;
        }

        if (saleType === 'retail') {
            if (qty > product.stock) {
                alert(`${currentLanguage === 'sw' ? 'Hisa haitoshi! Zilizopo' : 'Not enough stock! Available'}: ${product.stock} ${product.retailUnit}`);
                return;
            }
            const revenue = qty * price;
            const cost = qty * product.costPerRetail;
            const profit = revenue - cost;
            product.stock -= qty;
            sales.push({ id: Date.now(), productId, productName: product.name, qty, unit: product.retailUnit, price, revenue, cost, profit, saleType: 'retail', date: new Date().toISOString() });
        } else {
            if (!product.sellPriceBulk) {
                alert(currentLanguage === 'sw' ? 'Bidhaa hii haina bei ya jumla.' : 'This product has no bulk price.');
                return;
            }
            const retailQty = qty * product.conversion;
            if (retailQty > product.stock) {
                alert(`${currentLanguage === 'sw' ? 'Hisa haitoshi! Zilizopo' : 'Not enough stock! Available'}: ${product.stock} ${product.retailUnit}`);
                return;
            }
            const revenue = qty * price;
            const cost = retailQty * product.costPerRetail;
            const profit = revenue - cost;
            product.stock -= retailQty;
            sales.push({ id: Date.now(), productId, productName: product.name, qty, unit: product.bulkUnit, price, revenue, cost, profit, saleType: 'bulk', date: new Date().toISOString() });
        }

        saveState();
        saleQtyInput.value = '';
        salePriceInput.value = '';
        renderSales();
        updateProductSelects();
        renderProducts();
        updateDashboard();
    }

    addSaleBtn.addEventListener('click', recordSale);

    function renderSales() {
        salesListEl.innerHTML = '';
        if (sales.length === 0) {
            salesEmptyEl.style.display = 'block';
        } else {
            salesEmptyEl.style.display = 'none';
        }
        sales.slice().reverse().slice(0, 10).forEach(sale => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div>
                    <strong>${sale.productName}</strong>
                    <div>${sale.qty} ${sale.unit} × TSh ${sale.price} (${sale.saleType})</div>
                </div>
                <div style="font-weight:600;">TSh ${sale.revenue}</div>
            `;
            salesListEl.appendChild(item);
        });
    }

    // ─── Expense Functions (same) ───
    function addExpense() {
        const description = expenseDescInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);
        const category = expenseCategorySelect.value;
        if (!description || !amount) {
            alert(currentLanguage === 'sw' ? 'Ingiza maelezo na kiasi.' : 'Enter description and amount.');
            return;
        }
        expenses.push({ id: Date.now(), description, amount, category, date: new Date().toISOString() });
        saveState();
        expenseDescInput.value = '';
        expenseAmountInput.value = '';
        renderExpenses();
        updateDashboard();
    }

    addExpenseBtn.addEventListener('click', addExpense);

    function renderExpenses() {
        expensesListEl.innerHTML = '';
        if (expenses.length === 0) {
            expensesEmptyEl.style.display = 'block';
        } else {
            expensesEmptyEl.style.display = 'none';
        }
        expenses.slice().reverse().slice(0, 10).forEach(expense => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div><strong>${expense.description}</strong><div>${expense.category}</div></div>
                <div style="font-weight:600;">TSh ${expense.amount}</div>
            `;
            expensesListEl.appendChild(item);
        });
    }

    // ─── Loan Functions ───
    function addLoan() {
        const name = debtorNameInput.value.trim();
        const phone = debtorPhoneInput.value.trim();
        const amount = parseFloat(loanAmountInput.value);
        if (!name || !amount) {
            alert(currentLanguage === 'sw' ? 'Ingiza jina na kiasi.' : 'Enter name and amount.');
            return;
        }
        debtors.push({
            id: Date.now(),
            name,
            phone,
            totalLoan: amount,
            totalRepaid: 0
        });
        saveState();
        debtorNameInput.value = '';
        debtorPhoneInput.value = '';
        loanAmountInput.value = '';
        renderDebtors();
        updateRepaymentSelect();
        updateDashboard();
    }

    addLoanBtn.addEventListener('click', addLoan);

    function addRepayment() {
        const debtorId = parseInt(repaymentDebtorSelect.value);
        const amount = parseFloat(repaymentAmountInput.value);
        if (!debtorId || !amount) {
            alert(currentLanguage === 'sw' ? 'Chagua mdaiwa na kiasi.' : 'Select debtor and amount.');
            return;
        }
        const debtor = debtors.find(d => d.id === debtorId);
        if (!debtor) return;
        if (amount > (debtor.totalLoan - debtor.totalRepaid)) {
            alert(currentLanguage === 'sw' ? 'Malipo yanazidi salio!' : 'Payment exceeds balance!');
            return;
        }
        debtor.totalRepaid += amount;
        saveState();
        repaymentAmountInput.value = '';
        renderDebtors();
        updateRepaymentSelect();
        updateDashboard();
    }

    addRepaymentBtn.addEventListener('click', addRepayment);

    function updateRepaymentSelect() {
        repaymentDebtorSelect.innerHTML = '';
        debtors.forEach(debtor => {
            const option = document.createElement('option');
            option.value = debtor.id;
            option.textContent = `${debtor.name} (Salio: TSh ${(debtor.totalLoan - debtor.totalRepaid).toFixed(2)})`;
            repaymentDebtorSelect.appendChild(option);
        });
    }

    function renderDebtors() {
        debtorsListEl.innerHTML = '';
        if (debtors.length === 0) {
            debtorsEmptyEl.style.display = 'block';
        } else {
            debtorsEmptyEl.style.display = 'none';
        }
        debtors.forEach(debtor => {
            const balance = debtor.totalLoan - debtor.totalRepaid;
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div>
                    <strong>${debtor.name}</strong>
                    <div style="font-size:0.85rem; color:#64748b;">${debtor.phone || ''}</div>
                    <div style="font-size:0.85rem;">
                        ${currentLanguage === 'sw' ? 'Ametoka' : 'Borrowed'}: TSh ${debtor.totalLoan.toFixed(2)} |
                        ${currentLanguage === 'sw' ? 'Amerudisha' : 'Repaid'}: TSh ${debtor.totalRepaid.toFixed(2)}
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:600; color:${balance > 0 ? '#b91c1c' : '#16a34a'};">TSh ${balance.toFixed(2)}</div>
                    <button class="delete-btn" data-debtor-id="${debtor.id}" style="background:none;border:none;color:#b91c1c;cursor:pointer;">✕</button>
                </div>
            `;
            debtorsListEl.appendChild(item);
        });

        debtorsListEl.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.debtorId);
                debtors = debtors.filter(d => d.id !== id);
                saveState();
                renderDebtors();
                updateRepaymentSelect();
                updateDashboard();
            });
        });
    }

    // ─── Dashboard Update ───
    function updateDashboard() {
        const today = new Date().toDateString();
        const todaySales = sales.filter(s => new Date(s.date).toDateString() === today).reduce((sum, s) => sum + s.revenue, 0);
        const todayExpenses = expenses.filter(e => new Date(e.date).toDateString() === today).reduce((sum, e) => sum + e.amount, 0);
        const todayCost = sales.filter(s => new Date(s.date).toDateString() === today).reduce((sum, s) => sum + s.cost, 0);
        const todayProfit = todaySales - todayCost - todayExpenses;

        todaySalesEl.textContent = `TSh ${todaySales.toLocaleString()}`;
        todayExpensesEl.textContent = `TSh ${todayExpenses.toLocaleString()}`;
        todayProfitEl.textContent = `TSh ${todayProfit.toLocaleString()}`;

        const stockValue = products.reduce((sum, p) => sum + (p.stock * p.costPerRetail), 0);
        stockValueEl.textContent = `TSh ${stockValue.toLocaleString()}`;

        const totalLoanDebt = debtors.reduce((sum, d) => sum + (d.totalLoan - d.totalRepaid), 0);
        totalLoansEl.textContent = `TSh ${totalLoanDebt.toLocaleString()}`;

        const lowStockProducts = products.filter(p => p.stock <= 5);
        lowStockListEl.innerHTML = '';
        if (lowStockProducts.length === 0) {
            noAlertsEl.style.display = 'block';
        } else {
            noAlertsEl.style.display = 'none';
        }
        lowStockProducts.forEach(product => {
            const item = document.createElement('div');
            item.className = 'list-item low-stock-item';
            item.innerHTML = `<div><strong>${product.name}</strong></div><div>${product.stock} ${product.retailUnit}</div>`;
            lowStockListEl.appendChild(item);
        });
    }

    // ─── Event Listeners ───
    addProductBtn.addEventListener('click', addOrUpdateProduct);
    addStockInBtn.addEventListener('click', addStockIn);
    addSaleBtn.addEventListener('click', recordSale);
    addExpenseBtn.addEventListener('click', addExpense);
    retailSaleBtn.addEventListener('click', () => setSaleType('retail'));
    bulkSaleBtn.addEventListener('click', () => setSaleType('bulk'));
    saleProductSelect.addEventListener('change', updateSalePriceForProduct);
    addLoanBtn.addEventListener('click', addLoan);
    addRepaymentBtn.addEventListener('click', addRepayment);
    langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLanguage === 'sw' ? 'en' : 'sw');
    });

    // ─── Initial Load ───
    loadState();
    applyLanguage(currentLanguage);
    setSaleType('retail');
    renderProducts();
    renderStockIns();
    renderSales();
    renderExpenses();
    renderDebtors();
    updateProductSelects();
    updateRepaymentSelect();
    updateDashboard();
});