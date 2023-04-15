const API_ROOT = "https://reqres.in/api/";
const nbMaxAttendees = 30;







if (navigator.storage && navigator.storage.persist) {
	navigator.storage.persist().then(granted => {
		if (granted) {
			alert("Storage will persist and not be cleared");
		} else {
			alert("Storage won’t persist and may be cleared");
		}
	});
} else
{
	alert("Go fuck yourself")
}






function fetchAttendees() {
	return fetch(API_ROOT + `users`)
			.then(res => res.json())
			.then(res => res.data || [])
}

function renderAttendees(attendees = []) {
	const attendeesSection = document.getElementById("attendees");
	attendeesSection.innerHTML = `
	<h1>Attendees: ${attendees.length} / ${nbMaxAttendees}</h1>
	<ul>
		${attendees.map(user => `
		<li class='card'>
			<img src="${user.avatar}" alt="Avatar" class="avatar">
			<p>
				<span class="firstname">${user.first_name}</span>
				<br>
				<span class="lastname">${user.last_name}</span>
			</p>
		</li>
		`).join('')}
	</ul>
	`

	const registerSection = document.getElementById("register");
	const isFull = (attendees.length >= nbMaxAttendees);
	registerSection.querySelectorAll("input, button").forEach(elm => {
		elm.disabled = isFull
	});
	registerSection.querySelector(".status").innerHTML = isFull
			? `Sorry, this event is full.`
			: `Some places are still available for you to register for this event.`
}

document.addEventListener("DOMContentLoaded", () => {
	fetchAttendees().then(renderAttendees);


	navigator.serviceWorker
			.register('/PWA-Workshop/sw.js', {scope: '/PWA-Workshop/'})
			.then(serviceWorker => {
				console.log("Service Worker registered: ", serviceWorker);
			})
			.catch(error => {
				console.error("Error registering the Service Worker: ", error);
			});
	//TODO: Etape 2 - Installation du Service Worker au chargement du document

	//TODO: Etape 4 - Réception de messages depuis le Service Worker
});


