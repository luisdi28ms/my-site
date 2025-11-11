// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const daysTogether = document.querySelector("#days-together");

const today = new Date();
const firstDay = new Date("2022-12-04");
const diffInMs = Math.abs(today.getTime() - firstDay.getTime());
const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
const diffInYears = Math.ceil(diffInDays / 365);

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook() {
	book.style.transform = "translateX(50%)";
	nextBtn.style.visibility = "visible";
	prevBtn.style.visibility = "visible";
}

function closeBook(isAtBeginning) {
	if (isAtBeginning) {
		book.style.transform = "translateX(0%)";
		prevBtn.style.visibility = "hidden";
	} else {
		book.style.transform = "translateX(100%)";
		nextBtn.style.visibility = "hidden";
	}

}

function goNextPage() {
	if (currentLocation < maxLocation) {
		switch (currentLocation) {
			case 1:
				openBook();
				paper1.classList.add("flipped");
				paper1.style.zIndex = 1;
				break;
			case 2:
				paper2.classList.add("flipped");
				paper2.style.zIndex = 2;
				break;
			case 3:
				paper3.classList.add("flipped");
				paper3.style.zIndex = 3;
				closeBook(false);
				break;
			default:
				throw new Error("unkown state");
		}
		currentLocation++;
	}
}

function goPrevPage() {
	if (currentLocation > 1) {
		switch (currentLocation) {
			case 2:
				closeBook(true);
				paper1.classList.remove("flipped");
				paper1.style.zIndex = 3;
				break;
			case 3:
				paper2.classList.remove("flipped");
				paper2.style.zIndex = 2;
				break;
			case 4:
				openBook();
				paper3.classList.remove("flipped");
				paper3.style.zIndex = 1;
				break;
			default:
				throw new Error("unkown state");
		}

		currentLocation--;
	}
}

daysTogether.innerHTML = `It's been ${diffInDays} days (${diffInYears} years) since that day.`;
