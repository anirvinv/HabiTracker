export default async function habitID({ params }) {
	const data = await fetch(process.env.API_URL + "/habit/" + params.id, {
		cache: "no-cache",
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	if (!data.ok) {
		return "Page not found";
	}

	const res = await data.json();

	return (
		<div>
			<p className="text-2xl">{res.name}</p>
			{res.checkin_ids.map((id) => {})}
			{JSON.stringify(res)}
		</div>
	);
}
