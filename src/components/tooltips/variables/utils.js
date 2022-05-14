import { color } from "$data/variables.json";

const getComplianceSVG = (thisLevel) => {
  // convert the compliance levels for this rec into svg code
  let circleW = 15;
  let r = (circleW * 0.83) / 2;
  let result = [
    `<svg viewBox="0 0 ${circleW * 6} ${circleW}" width="${
      circleW * 6
    }" height="${circleW}" style='transform:translateY(5px)' xmlns="http://www.w3.org/2000/svg">`
  ];

  // set color
  let complianceColor = color.a1;
  let complianceLevels = [
    "No Mention",
    "Inaction",
    "Consideration",
    "Delegation",
    "Execution",
    "Compliance"
  ];

  complianceLevels.forEach((level, i) => {
    result.push(
      `<circle cx="${i * circleW + circleW / 2}" cy="${circleW / 2}" r="${r}" fill="${
        color.white
      }" stroke="${complianceColor}" stroke-width="2"/>`
    );
    if (thisLevel === level) {
      result.push(
        `<circle cx="${i * circleW + circleW / 2}" cy="${circleW / 2}" r="${r * 0.8}" fill="${
          color.a1
        }" stroke="none"/>`
      );
    }
  });
  result.push("</svg>");
  return result.join("");
};

export const getComplianceDiv = (node, listItems) => {
  let statusLevel = listItems.children[0].text;
  let descriptionText = listItems.children[1].text;

  let container = document.createElement("div");
  container.setAttribute("class", "list-item");

  // add the circle
  let svgContainer = document.createElement("div");
  svgContainer.innerHTML = getComplianceSVG(statusLevel);
  container.appendChild(svgContainer);

  // add the text content
  let textContainer = document.createElement("div");
  let status = document.createElement("strong");
  status.innerHTML = statusLevel;
  textContainer.appendChild(status);
  textContainer.append(descriptionText);

  container.appendChild(textContainer);

  return container;
};
