import { useState, useEffect, useCallback } from "react";
import { useStorages, useShoppingList, type Product } from "shelflife-react-hooks";
import ProductSelector from "../items/ProductSelector";
import { toast } from "react-toastify";

export default function CreateShoppingListItemForm() {
	const { createItem, fetchAggregated, items } = useShoppingList();
	const { fetchStorages, storages } = useStorages();

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

		toast.success("Item successfully added")
	};

	const predicate = useCallback(
		(p: Product) =>
			!items.find(i => i.product.id === p.id && i.storage.id === selectedStorage),
		[items, selectedStorage]
	);

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

			{
				selectedStorage > 0 &&
				<div className={"p-4 shadow"}>
					<ProductSelector
						onSelect={setSelectedProduct}
						selectedProductId={selectedProduct}
						predicate={predicate}
					/>
				</div>
			}

			<fieldset className={"fieldset " + (selectedProduct > 0 && selectedStorage > 0 ? "" : "hidden")}>
				<legend className="fieldset-legend">Amount</legend>
				<input
					type="number"
					min={1}
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