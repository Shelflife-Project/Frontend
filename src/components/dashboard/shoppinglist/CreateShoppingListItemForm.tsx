import { useState, useEffect, useMemo } from "react";
import { useProducts, useStorages, useShoppingList } from "shelflife-react-hooks";

export default function CreateShoppingListItemForm() {
	const { createItem, fetchAggregated, items } = useShoppingList();
	const { fetchProducts, products } = useProducts();
	const { fetchStorages, storages } = useStorages();

	const [productSearch, setProductSearch] = useState("");
	const [storageSearch, setStorageSearch] = useState("");

	const [selectedStorage, setSelectedStorage] = useState<number>(0);
	const [selectedProduct, setSelectedProduct] = useState<number>(0);
	const [amount, setAmount] = useState(1);

	useEffect(() => {
		fetchAggregated();
	}, []);

	useEffect(() => {
		fetchStorages(storageSearch, 10, 0);
		setSelectedStorage(0);
	}, [storageSearch]);

	useEffect(() => {
		fetchProducts(productSearch, 10, 0);
		setSelectedProduct(0);
	}, [productSearch]);

	const filteredProducts = useMemo(() => {
		if (selectedStorage <= 0) return products;

		return products.filter(p => !items.find(i => i.product.id === p.id && i.storage.id === selectedStorage))
	}, [products, selectedStorage]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedStorage || !selectedProduct || amount <= 0) return;

		await createItem(selectedStorage, {
			productId: selectedProduct,
			amountToBuy: amount,
		});

		setSelectedProduct(0);
		setSelectedStorage(0);
		setAmount(1);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<h2 className="text-2xl font-bold text-green-700">
				Add Shopping Item
			</h2>

			<div className={"p-4 shadow"}>
				<p className="mb-2">Storage</p>
				<div className="grid grid-cols-2 gap-4">
					<input
						type="text"
						placeholder="Search storage..."
						className="input w-full"
						value={storageSearch}
						onChange={(e) => setStorageSearch(e.target.value)}
					/>

					<select
						value={selectedStorage}
						onChange={(e) => {
							setSelectedStorage(Number(e.target.value));
							setSelectedProduct(0);
						}}
						className="select w-full">
						<option value={0} disabled>Select a storage</option>
						{storages.map((s) => (
							<option key={s.id} value={s.id}>
								{s.name}
							</option>
						))}
					</select>
				</div>

			</div>

			<div className={"p-4 shadow " + (selectedStorage > 0 ? "" : "hidden")}>
				<p className="mb-2">Product</p>
				<div className="grid grid-cols-2 gap-4">
					<input
						type="text"
						placeholder="Search product..."
						className="input w-full"
						value={productSearch}
						onChange={(e) => setProductSearch(e.target.value)}
					/>

					<select
						value={selectedProduct ?? ""}
						onChange={(e) => setSelectedProduct(Number(e.target.value))}
						disabled={!selectedStorage}
						className="select w-full">

						<option value="">Select product</option>

						{filteredProducts.map((p) => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}

						{selectedStorage && filteredProducts.length === 0 && (
							<option disabled>All products already added</option>
						)}
					</select>
				</div>

			</div>

			<fieldset className={"fieldset " + (selectedProduct > 0 && selectedStorage > 0 ? "" : "hidden")}>
				<legend className="fieldset-legend">Amount</legend>
				<input
					type="number"
					min={1}
					placeholder="Search storage..."
					className="input w-full"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
			</fieldset>

			<button
				type="submit"
				disabled={!selectedStorage || !selectedProduct}
				className="btn btn-success w-full"
			>
				Add Item
			</button>
		</form>
	);
}