import './style.css'
import { gsap } from 'gsap'

const projects = document.querySelector('.projects');
const preview = document.querySelector('.preview');
const previewImg = document.querySelector('.preview-img');

let isInside = false;

const bgPositions = {
  p1: "0 0",
  p2: "0 33.3%",
  p3: "0 66.8%",
  p4: "0 100%"
}

const moveStuff = (e) => {
  const mouseInside = isMouseInsideContainer(e);
  console.log(isInside);

  if(mouseInside !== isInside) {
    isInside = mouseInside;
    if(isInside) {
      gsap.to(preview, 0.3 ,{
        scale: 1,
      })
    } else {
      gsap.to(preview, 0.3 ,{
        scale: 0,
      })
    }
  }
}

const moveProject = (e) => {
  const previewRect = preview.getBoundingClientRect();
  const offsetX = previewRect.width / 2;
  const offsetY = previewRect.height / 2;

  preview.computedStyleMap.left = e.pageX - offsetX + "px";
  preview.computedStyleMap.top = e.pageY - offsetY + "px";
}

const moveProjectImg = (project) => {
  const projectId = project.id;
  gsap.to(previewImg, 0.4, {
    backgroundPosition: bgPositions[projectId] || "0 0",
  })
}

const isMouseInsideContainer = (e) => {
  const containerRect = projects.getBoundingClientRect();
  return (
    e.pageX >= containerRect.left &&
    e.pageX <= containerRect.right &&
    e.pageY >= containerRect.top &&
    e.pageY <= containerRect.bottom
  )
}

window.addEventListener("mousemove", moveStuff);

Array.from(projects.children).forEach((project) => {
  console.log(project);
  project.addEventListener("mousemove", moveProject);
  project.addEventListener("mousemove", moveProjectImg.bind(null, project));
})

document.addEventListener('mousemove', function (e) {
  gsap.to(preview, { duration: 0.3, left: e.pageX, top: e.pageY });
});