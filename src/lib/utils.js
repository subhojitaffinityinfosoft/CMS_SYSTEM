import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from "moment";
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



export const getDataUri = async (
  url,
  displayWidth,
  displayHeight,
  shape = "rect",
  removeBg = false
) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "Anonymous"; // important if image is from another domain
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      const ctx = canvas.getContext("2d");

      // Draw image first
      ctx.drawImage(this, 0, 0, displayWidth, displayHeight);

      // === Background Removal Step ===
      if (removeBg) {
        const imageData = ctx.getImageData(0, 0, displayWidth, displayHeight);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Simple white background threshold
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // transparent
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // === Mask Step ===
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();

      if (shape === "circle") {
        ctx.arc(displayWidth / 2, displayHeight / 2, displayWidth / 2, 0, Math.PI * 2);
      } else if (shape === "rounded") {
        const radius = 30;
        ctx.moveTo(radius, 0);
        ctx.lineTo(displayWidth - radius, 0);
        ctx.quadraticCurveTo(displayWidth, 0, displayWidth, radius);
        ctx.lineTo(displayWidth, displayHeight - radius);
        ctx.quadraticCurveTo(displayWidth, displayHeight, displayWidth - radius, displayHeight);
        ctx.lineTo(radius, displayHeight);
        ctx.quadraticCurveTo(0, displayHeight, 0, displayHeight - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
      } else if (shape === "hexagon") {
        const w = displayWidth;
        const h = displayHeight;
        const dy = h / 4;

        ctx.moveTo(w / 2, 0);
        ctx.lineTo(w, dy);
        ctx.lineTo(w, h - dy);
        ctx.lineTo(w / 2, h);
        ctx.lineTo(0, h - dy);
        ctx.lineTo(0, dy);
        ctx.closePath();
      } else if (shape === "diamond") {
        const w = displayWidth;
        const h = displayHeight;

        ctx.moveTo(w / 2, 0);        // top
        ctx.lineTo(w, h / 2);        // right
        ctx.lineTo(w / 2, h);        // bottom
        ctx.lineTo(0, h / 2);        // left
        ctx.closePath();
      }else {
        ctx.rect(0, 0, displayWidth, displayHeight);
      }

      ctx.fill();
      resolve(canvas.toDataURL("image/png"));
    };

    image.onerror = function () {
      resolve("");
    };

    image.src = url;
  });
};
/*** For Getting Year */
export const getYear = () => {
  return new Promise((resolve, reject) => {
    try {
      const curr_year = new Date().getFullYear();
      resolve([curr_year, (curr_year - 1)])
    }
    catch (e) {
      reject(e)
    }
  })
}
/**** End */

/*** For Getting Month */
export const getMonth = () => {
  return new Promise((resolve, reject) => {
    try {
      const months = Array.from({ length: 12 }, (item, i) => {
        return { month: new Date(0, i).toLocaleString('en-US', { month: 'long' }), id: (i + 1) }
      });
      resolve(months);
    }
    catch (e) {
      reject(e);
    }
  })
}
/**** End */


export function checkEqualityOfTwoObject(obj1, obj2) {
  // Check if both objects are the same reference
  if (obj1 === obj2) return true;

  // Check if either obj1 or obj2 is null or not an object
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If the number of keys is different, objects are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare values for each key
  for (let key of keys1) {
    // If the key is not present in the second object, they are not equal
    if (!keys2.includes(key)) {
      return false;
    }

    // Recursively compare the values
    if (!checkEqualityOfTwoObject(obj1[key], obj2[key])) {
      return false;
    }
  }

  // If all checks passed, the objects are equal
  return true;
}




const meregeArrayIndexWise = (array1, array2,isHatchLab=false) => {
  const maxLength = Math.max(array1.length, array2.length);
  console.log(maxLength);
  // Merge the two arrays index-wise
  const mergedArray = [];
  for (let i = 0; i < maxLength; i++) {
    const item1 = array1[i] || []; // If index doesn't exist in array1, default to an empty array
    const item2 = array2[i] || []; // If index doesn't exist in array2, default to an empty array

    // Combine values from both arrays in alternating fashion
    const name1 = item1[0] || "--";
    const value1 = item1[1]?.toFixed(2) || "--";
    const name2 = item2[0] || "--";
    const value2 = item2[1]?.toFixed(2) || "--";
    if(!isHatchLab){
        mergedArray.push([
        { content: "", styles: { halign: 'left' } },
        { content: "", styles: { halign: 'left' } },
        { content: "", styles: { halign: 'left' } },
        { content: "", styles: { halign: 'left' } },
        { content: name1?.replace('\r', ''), styles: { halign: 'left', font: 'Exo2-Medium' } },
        { content: value1, styles: { halign: 'right', font: 'Exo2-Medium' } },
        { content: name2?.replace('\r', ''), styles: { halign: 'left', font: 'Exo2-Medium' } },
        { content: value2, styles: { halign: 'right', font: 'Exo2-Medium' } },
      ]);
    }
    else{
       mergedArray.push([
        { content: name1?.replace('\r', ''), styles: { halign: 'left', font: 'Exo2-Medium' } },
        { content: value1, styles: { halign: 'right', font: 'Exo2-Medium' } },
        { content: name2?.replace('\r', ''), styles: { halign: 'left', font: 'Exo2-Medium' } },
        { content: value2, styles: { halign: 'right', font: 'Exo2-Medium' } },
      ]);
    }
  
  }
  return mergedArray;
}


const calculateSumOfArray = (arr) => {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

export const getInitials =  (string) => {
  var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();
  
  if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};


function convertNumberToWords(amount) {
  const words = {
    0: '', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
    6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten',
    11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen',
    15: 'Fifteen', 16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen',
    19: 'Nineteen', 20: 'Twenty', 30: 'Thirty', 40: 'Forty',
    50: 'Fifty', 60: 'Sixty', 70: 'Seventy', 80: 'Eighty', 90: 'Ninety'
  };

  const units = ['', 'Thousand', 'Lakh', 'Crore'];

  function getWords(n) {
    let str = '';
    if (n > 19) {
      str += words[Math.floor(n / 10) * 10] + ' ' + words[n % 10];
    } else {
      str += words[n];
    }
    return str.trim();
  }

  function numToWords(n) {
    if (n === 0) return 'Zero Rupees';

    let result = '';
    const numStr = n.toString().padStart(9, '0'); // Pad to 9 digits for crore-lakh-thousand-hundred-units

    const crore = parseInt(numStr.slice(0, 2));
    const lakh = parseInt(numStr.slice(2, 4));
    const thousand = parseInt(numStr.slice(4, 6));
    const hundred = parseInt(numStr.slice(6, 7));
    const rest = parseInt(numStr.slice(7));

    if (crore) result += getWords(crore) + ' Crore ';
    if (lakh) result += getWords(lakh) + ' Lakh ';
    if (thousand) result += getWords(thousand) + ' Thousand ';
    if (hundred) result += getWords(hundred) + ' Hundred ';

    if (rest) {
      if (result !== '') result += 'and ';
      result += getWords(rest) + ' ';
    }

    return result.trim() + ' Rupees';
  }

  // Handle decimal part (paise)
  let [rupees, paise] = amount.toString().split('.');
  let result = numToWords(parseInt(rupees));

  if (paise && parseInt(paise) > 0) {
    result += ' and ' + getWords(parseInt(paise.padEnd(2, '0'))) + ' Paise';
  }

  return result;
}

export const getMenusByActionURL = (link,rawMenus) =>{
    try{
      console.log(rawMenus);
      console.log(link);
      const menuDtls = rawMenus?.find(el => el.link == link);
      console.log(menuDtls);
      return menuDtls;
    }
    catch(err){
      console.log(err.message);
      return null
    }
}


// src/utils/sanitizeHTML.js
export function sanitizeHTML(html = "") {
  if (!html || typeof html !== "string") return "";

  // Use DOMParser to safely parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove all <script> tags
  doc.querySelectorAll("script").forEach(el => el.remove());

  // Remove dangerous attributes like onclick, onerror, etc.
  doc.querySelectorAll("*").forEach(el => {
    [...el.attributes].forEach(attr => {
      const name = attr.name.toLowerCase();
      const value = attr.value.toLowerCase();

      // Remove event handlers or javascript URLs
      if (name.startsWith("on") || value.includes("javascript:")) {
        el.removeAttribute(name);
      }
    });
  });

  return doc.body.innerHTML;
}


export const degree = [
  { degreeId: 1, degreeName: "Higher Secondary / Class 12th" },
  { degreeId: 2, degreeName: "Graduate" },
  { degreeId: 3, degreeName: "Post Graduate" },
  { degreeId: 4, degreeName: "M Phil" },
  { degreeId: 5, degreeName: "Ph.D" },
  { degreeId: 6, degreeName: "Post Doctoral" }
]

 