let draggableEle= document.getElementById("draggable-ele");
let initialX= 0, initialY=0;
let moveElement= false;

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType= "";

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType= "touch";
        return true;
    } catch (e) {
        deviceType= "mouse";
        return false;
    }
};

isTouchDevice();

draggableEle.addEventListener(events[deviceType].down, (e) => {
    e.preventDefault();

    initialX= !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    initialY= !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    moveElement= true;
});

draggableEle.addEventListener(events[deviceType].move, (e) => {

    if(moveElement){
        e.preventDefault();
        let newX= !isTouchDevice() ? e.clientX : e.touches[0].clientX;
        let newY= !isTouchDevice() ? e.clientY : e.touches[0].clientY;

        draggableEle.style.top= draggableEle.offsetTop - (initialY - newY) + "px";
        draggableEle.style.left= draggableEle.offsetLeft - (initialX -newX) + "px";

        initialX= newX;
        initialY= newY;
    }
});

draggableEle.addEventListener(
    events[deviceType].up, (stopMovement = (e) => {
        moveElement= false;
    })
);

draggableEle.addEventListener("mouseleave", stopMovement);
draggableEle.addEventListener(events[deviceType] .up, (e) => {
    moveElement= false;
});