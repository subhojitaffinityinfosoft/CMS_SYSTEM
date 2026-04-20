import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from "moment";
import { base64Img } from "@/model/logoBase64";
import { hatchLabLogoBase64 } from "@/model/HatchLabLogoBase64";
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// export const getDataUri = async (url, displayWidth, displayHeight, fillStyle) => {
//   return new Promise((resolve) => {
//     const image = new Image();
//     image.onload = function () {
//       const canvas = document.createElement('canvas');
//       canvas.width = displayWidth;
//       canvas.height = displayHeight;
//       const ctx = canvas.getContext('2d');

//       if (fillStyle == '#fff') {
//         ctx.fillStyle = fillStyle;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.globalCompositeOperation = 'destination-in';
//         ctx.drawImage(this, 0, 0, displayWidth, displayHeight);
//       }
//       else {
//         ctx.drawImage(this, 0, 0, displayWidth, displayHeight);
//         ctx.globalCompositeOperation = 'destination-in';
//         ctx.fillStyle = fillStyle;
//         ctx.beginPath();
//         ctx.arc(displayWidth * 0.5, displayHeight * 0.5, displayWidth * 0.5, 0, 2 * Math.PI);
//         ctx.fill();
//       }
//       resolve(canvas.toDataURL('image/png'));
//     }
//     image.onerror = function () {
//       resolve(EMPTY_IMAGE);
//     }
//     image.src = url;
//   })
// }
// export const getDataUri = async (url, displayWidth, displayHeight, shape = "rect") => {
//   return new Promise((resolve) => {
//     const image = new Image();
//     image.crossOrigin = "Anonymous"; // important if API image is from another domain
//     image.onload = function () {
//       const canvas = document.createElement("canvas");
//       canvas.width = displayWidth;
//       canvas.height = displayHeight;
//       const ctx = canvas.getContext("2d");

//       // Always draw image first
//       ctx.drawImage(this, 0, 0, displayWidth, displayHeight);
//       ctx.globalCompositeOperation = "destination-in";
//       ctx.beginPath();

//       if (shape === "circle") {
//         // Circle mask
//         ctx.arc(displayWidth / 2, displayHeight / 2, displayWidth / 2, 0, Math.PI * 2);
//       } else if (shape === "rounded") {
//         // Rounded rectangle mask
//         const radius = 30;
//         ctx.moveTo(radius, 0);
//         ctx.lineTo(displayWidth - radius, 0);
//         ctx.quadraticCurveTo(displayWidth, 0, displayWidth, radius);
//         ctx.lineTo(displayWidth, displayHeight - radius);
//         ctx.quadraticCurveTo(displayWidth, displayHeight, displayWidth - radius, displayHeight);
//         ctx.lineTo(radius, displayHeight);
//         ctx.quadraticCurveTo(0, displayHeight, 0, displayHeight - radius);
//         ctx.lineTo(0, radius);
//         ctx.quadraticCurveTo(0, 0, radius, 0);
//       } else if (shape === "hexagon") {
//         // Hexagon mask
//         const w = displayWidth;
//         const h = displayHeight;
//         const side = w / 2;
//         const dx = w / 4;
//         const dy = h / 4;

//         ctx.moveTo(w / 2, 0);
//         ctx.lineTo(w, dy);
//         ctx.lineTo(w, h - dy);
//         ctx.lineTo(w / 2, h);
//         ctx.lineTo(0, h - dy);
//         ctx.lineTo(0, dy);
//         ctx.closePath();
//       } else {
//         // Default rectangle (no mask)
//         ctx.rect(0, 0, displayWidth, displayHeight);
//       }

//       ctx.fill();
//       resolve(canvas.toDataURL("image/png"));
//     };

//     image.onerror = function () {
//       resolve("");
//     };

//     image.src = url;
//   });
// };


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


export const generateBankStateMentReportAsPdf = async (res, font, Boldfont) => {
  try {
    const doc = new jsPDF();
    /**
     * CUSTOM FONT ADDITION
     */
    doc.addFileToVFS('Exo2-Medium-normal.ttf', font);
    doc.addFont('Exo2-Medium-normal.ttf', 'Exo2-Medium', 'normal');
    doc.addFileToVFS('Exo2-Bold-bold.ttf', Boldfont);
    doc.addFont('Exo2-Bold-bold.ttf', 'Exo-Bold', 'bold');
    /** END */
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth(); // get Pdf Page Dimension
    /**
     *  Set Pdf Header
     */
    let HeaderName = "Techno International New Town"
    doc.setFont('Exo2-Medium')
    doc.setTextColor('#dc2626')
    doc.text(HeaderName, pageWidth / 2, 10, { align: 'center' });
    const headerTxtDimen = doc.getTextDimensions(HeaderName);  // get Text dimensions

    let FormerlyKnownAs = "(Formerly known as Techno India College of Technology)";
    doc.setFont('Exo2-Medium')
    doc.setTextColor('#282828')
    doc.setFontSize(8)
    doc.text(FormerlyKnownAs, pageWidth / 2, headerTxtDimen.h + 10, { align: 'center' });
    const FormerlyKnownAsDimen = doc.getTextDimensions(FormerlyKnownAs); // get Text dimensions

    let address = "1/1,DG Block (Newtown),Action Area I,Newtown,Kolkata, West Bengal 700156";
    doc.setFont('Exo2-Medium')
    doc.setTextColor('#282828')
    doc.setFontSize(8)
    doc.text(`${address}`.toUpperCase(), pageWidth / 2, FormerlyKnownAsDimen.h + headerTxtDimen.h + 13, { align: 'center' });
    const addressDimen = doc.getTextDimensions(address);  // get Text dimensions
    /** END */
    doc.setLineWidth(0.2);
    doc.line(0, FormerlyKnownAsDimen.h + headerTxtDimen.h + 15, pageWidth, FormerlyKnownAsDimen.h + headerTxtDimen.h + 15);
    /**
    *  Set Employee Category
    */
    //  let EmpCatHeaderTitle = "Employee Category : ";
    // doc.setFont('Exo-Bold','','bold')
    // doc.setTextColor('#282828')
    // doc.setFontSize(8)
    // doc.text(EmpCatHeaderTitle, 17, FormerlyKnownAsDimen.h + headerTxtDimen.h + addressDimen.h + 19, {align: 'center'});
    //  const EmpCatHeaderTitleDimen = doc.getTextDimensions(EmpCatHeaderTitle); // get Text dimensions
    //  let emp_cat = el;
    //  doc.setFont('Exo-Bold')
    //  doc.setTextColor('#282828')
    //  doc.setFontSize(8)
    //  doc.text(`${emp_cat}`.toUpperCase(),EmpCatHeaderTitleDimen.w + 14,  FormerlyKnownAsDimen.h + headerTxtDimen.h + addressDimen.h + 19, {align: 'center'});
    //  const emp_catDimen = doc.getTextDimensions(emp_cat); // get Text dimensions
    /**
     * End
     */

    /**
    *  BANK REGISTER REPROT  
    */
   console.log(res);
    let reportType = `BANK REGISTER REPORT FOR THE MONTH OF ${moment().month(res[0]?.month).format('MMMM')} ${res[0]?.year}`;
    doc.setFont('Exo-Bold', '', 'bold')
    doc.setTextColor('#282828')
    doc.setFontSize(8)
    doc.text(reportType, pageWidth / 2, FormerlyKnownAsDimen.h + headerTxtDimen.h + addressDimen.h + 19, { align: 'center' });
    // get Text dimensions
    /***
     * END
     */

    /**
     *  PAYMENT MODE 
     */
    let getPaymentMode = "Payment Mode - BANK"
    doc.setFontSize(8)
    doc.setTextColor('#282828')
    const monthPaymentModeRptTxtDimen = doc.getTextDimensions(getPaymentMode);
    doc.text(getPaymentMode, pageWidth / 1.1, FormerlyKnownAsDimen.h + headerTxtDimen.h + addressDimen.h + 19, { align: 'center' });
    /**
     * END
     *  */
    // res.forEach(el =>{
    //     let netAmt = 0;
    // const mdppedBody = el.map(ele =>{
    //     netAmt+=ele.netAmount;
    //     return [
    //         ele.bankName ? ele.bankName : 'N/A',
    //         ele.name,
    //         ele.bankBranch? ele.bankBranch : 'N/A',
    //         ele.accountNo ? ele.accountNo : 'N/A',
    //         ele.ifscCode ? ele.ifscCode : 'N/A',
    //         {content:ele.netAmount ? ele.netAmount : 0 , colSpan:1, styles: {halign:'right'}},
    //         ele.unitName ? ele.unitName : 'N/A',
    //     ]
    // })
    //   });
    let netAmt = 0;
    const mdppedBody = res.map(ele => {
      netAmt += ele.netAmount;
      return [
        ele.bankName ? ele.bankName : 'N/A',
        ele.name,
        ele.bankBranch ? ele.bankBranch : 'N/A',
        ele.accountNo ? ele.accountNo : 'N/A',
        ele.ifscCode ? ele.ifscCode : 'N/A',
        // { content: ele.netAmount ? ele.netAmount : 0, colSpan: 1, styles: { halign: 'right' } },
        ele.unitName ? ele.unitName : 'N/A',
      ]
    })
    autoTable(doc, {
      rowPageBreak: true,
      tableWidth: doc.internal.pageSize.getWidth() - 6,
      margin: {
        left: 3,
        top: FormerlyKnownAsDimen.h + headerTxtDimen.h + addressDimen.h + 21 + monthPaymentModeRptTxtDimen.h
      },
      theme: 'striped',
      styles: {
        // font: 'Exo2-Medium',
        // fontStyle: 'bold',
        fontSize: 9,
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        halign: 'center',
        fontSize: 7,
        font: 'Exo-Bold'
      },
      bodyStyles: {
        fontSize: 7,
        halign: 'center',
        font: 'Exo2-Medium',
        fontStyle:'normal'

      },
      footStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        halign: 'center',
        font: 'Exo-Bold',
        fontStyle:'bold',
        fontSize: 7,
      },
      body: mdppedBody,
      // head: [["BANK NAME", "NAME", "BANK BRANCH", "ACCOUNT NO", "IFSC", "NET AMOUNT", "BRANCH"]],
      head: [["BANK NAME", "NAME", "BANK BRANCH", "ACCOUNT NO", "IFSC",  "BRANCH"]],

      foot: [
        [{ content: 'Grand Total', colSpan: 5, styles: { halign: 'right', lineWidth: { bottom: 0, top: 0.3, left: 0, right: 0 } } },
        { content: netAmt, colSpan: 1, styles: { halign: 'right', lineWidth: { bottom: 0, top: 0.3, left: 0, right: 0 } } },
        { content: "", colSpan: 1, styles: { halign: 'right', lineWidth: { bottom: 0, top: 0.3, left: 0, right: 0 } } }]
      ]
    })
    doc.setDocumentProperties({
      title: 'Bank Statement',
      author: "Techno India",
      creator: "Techno India"
    })
    doc?.output('dataurlnewwindow')
  }
  catch (err) {
    console.log(err);
  }
}

export const generatePaySlipReportAsPdf = async (res, font, Boldfont) => {
  try {
    console.log('RESSSS')
    let row1_col1_title = 'Employee Name : ';
    let row1_col2_title = 'Unit Name : ';
    let row2_col1_title = 'Employee Code : ';
    let row2_col2_title = 'Mode Of Payment : ';
    let row3_col1_title = 'Designation : ';
    let row3_col2_title = 'UAN No : ';
    const doc = new jsPDF();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth(); // get Pdf Page Dimension
    doc.deletePage(1);
    doc.addFileToVFS('Exo2-Medium-normal.ttf', font);
    doc.addFont('Exo2-Medium-normal.ttf', 'Exo2-Medium', 'normal');
    doc.addFileToVFS('Exo-Bold-bold.ttf', Boldfont);
    doc.addFont('Exo-Bold-bold.ttf', 'Exo-Bold', 'bold');
    res.forEach((el, index) => {
      doc.addPage();
      doc.addImage(base64Img, 'JPEG', 5, 2, 20, 20, undefined, 'FAST');
      let HeaderName = res.length > 0 ? res[0]?.unitName : ''
      doc.setFontSize(15)
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#dc2626')
      doc.text(HeaderName, pageWidth / 2, 10, { align: 'center' });
      const headerTxtDimen = doc.getTextDimensions(HeaderName);

      // let FormerlyKnownAs = "(Formerly known as Techno India College of Technology)";
      let FormerlyKnownAs = "";

      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828')
      doc.setFontSize(8)
      doc.text(FormerlyKnownAs, pageWidth / 2, headerTxtDimen.h + 10, { align: 'center' });
      const FormerlyKnownAsDimen = doc.getTextDimensions(FormerlyKnownAs);

      let address = `PaySlip For The Month Of - ${moment().month(el?.month - 1).format('MMMM')} / ${el?.year}`;
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828')
      doc.setFontSize(8)
      doc.text(`${address}`.toUpperCase(), pageWidth / 2, FormerlyKnownAsDimen.h + headerTxtDimen.h + 13, { align: 'center' });
      const addressDimen = doc.getTextDimensions(address);

      // let empNameTitle = "Employee Name : ";
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.setFontSize(8)
      const empNameTitleDimen = doc.getTextDimensions(row1_col1_title);
      doc.text(`${row1_col1_title}`, 16, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h, { align: 'center' });
      doc.text(`${row1_col2_title}`, pageWidth / 1.22, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h, { align: 'right' });
      doc.text(`${row2_col1_title}`, 15.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + empNameTitleDimen.h, { align: 'center' });
      doc.text(`${row2_col2_title}`, pageWidth / 1.435, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + empNameTitleDimen.h, { align: 'left' });
      doc.text(`${row3_col1_title}`, 4.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      doc.text(`${row3_col2_title}`, pageWidth /  1.315, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828')
      doc.setFontSize(7)
      doc.text(`${el.name}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h, { align: 'left' });
      doc.text(`${el.unitName}`, (pageWidth / 1.39) + empNameTitleDimen.w, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h, { align: 'left' });
      doc.text(`${el.employeeCode}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + empNameTitleDimen.h, { align: 'left' });
      doc.text(`${el.payModeName}`, (pageWidth / 1.39) + empNameTitleDimen.w, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + empNameTitleDimen.h, { align: 'left' });
      doc.text(`${el.designationName}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      doc.text(`${el.uanNo ? el.uanNo : 'N/A'}`, (pageWidth / 1.202), FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      const earning = el.salaryProcessDetailRequestList.filter(item => item.isEarning && item.isPrinted);
      const deduction = el.salaryProcessDetailRequestList.filter(item => item.isPrinted && !item.isEarning);
      console.log(deduction);  
      const calculatedINR = earning.filter(head => head.isCalculative).map(i => Number(i.amount));
      const sumOfCalculatedINR = calculateSumOfArray(calculatedINR);
      const ctc = calculateSumOfArray(earning.map(el => el.amount));
      const deduct = deduction.map(j => Number(j.amount))
      const calculatedDeduction = calculateSumOfArray(deduct);
      // const netAmt = earning.find(el => el.earningDeductionId == 31); // earning Deduction Id Of Net Amount
      const totalDeduction = deduction.find(el => el.earningDeductionId == 41); // earning Deduction Id Of Total Deduction
      // console.log(deduction);
      // console.log(sumOfCalculatedINR);
      console.log(earning);
      const netAmt = earning.find(el => el.isNetPayHead);
      console.log(netAmt);
      const company_to_company = (netAmt ? (Number(netAmt?.amount)) : 0) + (totalDeduction ? Number(totalDeduction?.amount) : 0)
      let foot = [
        [
          { content: "", colSpan: 1, rowSpan: 4, styles: { halign: 'right' } },
          { content: "", colSpan: 1, rowSpan: 4, styles: { halign: 'right' } },
          { content: "", colSpan: 1, rowSpan: 4, styles: { halign: 'right' } },
          { content: "", colSpan: 1, rowSpan: 4, styles: { halign: 'right' } },
          { content: "", colSpan: 1, rowSpan: 1, styles: { halign: 'right', styles: { halign: 'center', font: 'Exo2-Medium' } } },
          { content: "", colSpan: 1, rowSpan: 1, styles: { halign: 'right', styles: { halign: 'center', font: 'Exo2-Medium' } } },
          { content: "Net INR Payble(Round off)", colSpan: 1, rowSpan: 1, styles: { halign: 'center', font: 'Exo2-Medium' } },
          // { content: (ctc - calculatedDeduction)?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
          { content:netAmt ? netAmt?.amount : 0.00, colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },

        ],
        // [
        //   // { content: "Calculated INR", colSpan: 1, rowSpan: 1, styles: { halign: 'center', font: 'Exo2-Medium' } },
        //   { content: "Calculated Deduction", colSpan: 1, rowSpan: 1, styles: { halign: 'center', font: 'Exo2-Medium' } },
        //   // { content: sumOfCalculatedINR?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        //   { content: totalDeduction ? totalDeduction?.amount?.toFixed(2) : 0.00, colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        //   { content: "Calculated Deduction", colSpan: 1, rowSpan: 1, styles: { halign: 'center', font: 'Exo2-Medium' } },
        //   // { content: calculatedDeduction?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        //   { content: totalDeduction ? totalDeduction?.amount?.toFixed(2) : 0.00, colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        // ],
        // [
        //   { content: "Cost To Company(CTC)", colSpan: 1, rowSpan: 1, styles: { halign: 'center' } },
        //   // { content: ctc?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        //   { content: company_to_company?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },

        //   { content: " Cost To Company(CTC)", colSpan: 1, rowSpan: 1, styles: { halign: 'center' } },
        //   // { content: ctc?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        //   { content: company_to_company?.toFixed(2), colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        // ]
      ];
      let arr = [];
      let isEarning = earning.filter(el => !el.isNetPayHead).map(ele => [ele.earningDeductionPrintName, ele.amount]);
      let isDeduction = deduction.map(ele => [ele.earningDeductionPrintName, ele.amount]);
      console.log(isEarning);
      console.log(isDeduction);
      arr = meregeArrayIndexWise(isEarning, isDeduction,false);

      console.log(arr);  
      autoTable(doc, {
        didDrawCell: (data) => {
          // Add dotted horizontal borders to the body cells
          if (data.row.index >= 0 && data.row.index !== 0) {  // Exclude header row
            const cell = data.cell;
            const x = cell.x;
            const y = cell.y + cell.height; // Position at the bottom of the cell
            const width = cell.width;
            doc.setLineWidth(0.4);
            doc.setDrawColor(250, 250, 250);
            doc.setLineDash([0.6, 0.6]);
            doc.line(x, y, x + width, y);
            doc.setLineDash([0.1]);
          }
        },
        rowPageBreak: true,
        tableWidth: doc.internal.pageSize.getWidth() - 6,
        margin: {
          left: 3,
          top: FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row3_col1_title).h
        },
        theme: 'striped',
        styles: {
          font: 'Exo-Bold',
          fontStyle: 'bold',
          fontSize: 9,
          lineColor: [82, 82, 82],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          halign: 'center',
          fontSize: 7,
          font: 'Exo-Bold'
        },
        bodyStyles: {
          fontSize: 7,
          halign: 'left',
          font: 'Exo-Bold',
          textColor: [0, 0, 0],
        },
        footStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 7
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0]
        },
        body: arr,
        head: [
          [
            { content: 'Leave Details', colSpan: 4, styles: { cellWidth: 20 } },
            { content: 'Salary Details', colSpan: 1 },
            { content: 'Amount', colSpan: 1 },
            { content: 'Deduction', colSpan: 1 },
            { content: 'Amount', colSpan: 1 }
          ],
          [
            { content: '', colSpan: 1 },
            { content: 'Previous', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } },
            { content: 'Current', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } },
            { content: 'Total', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } },
            { content: '', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } },
            { content: '', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } },
            { content: '', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } },
            { content: '', colSpan: 1, styles: { font: 'Exo2-Medium', fontSize: 7 } }
          ]
        ],
        foot: foot
      })
      doc.setFontSize(7)
      doc.text(`“This is system generated document and does not require signature”`,pageWidth / 3,doc.lastAutoTable.finalY + 5)
    })

    doc.setDocumentProperties({
      title: 'Payslip Statement',
      author: "Techno India",
      creator: "Techno India"
    })
    // doc?.output('dataurlnewwindow')
    doc?.save('Payslip Statement')

  }
  catch (err) {
    console.log(err);
  }
}

export const generatePaySlipReportAsPdfForHatchLab = async (res, font, Boldfont) =>{
      try {
    console.log('RESSSS')
    let row1_col1_title = 'Employee Name : ';
    let row1_col2_title = 'Bank Name : ';
    let row2_col1_title = 'Designation : ';
    let row2_col2_title = 'Branch : ';
    let row3_col1_title = 'Month & Year : ';
    let row3_col2_title = 'Bank A/c No : ';
    let row4_col1_title = 'Payable Days : ';
    let row4_col2_title = 'IFSC Code : ';
    let header_1="Registered Office :";
    let header_2="Email :";
    let header_3="Contact :";
    let header_4="CIN :";
    let pipe = "|"
    const doc = new jsPDF({
      orientation:'p',
      format:'A4'
    });
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth(); // get Pdf Page Dimension
    doc.deletePage(1);
    doc.addFileToVFS('Exo2-Medium-normal.ttf', font);
    doc.addFont('Exo2-Medium-normal.ttf', 'Exo2-Medium', 'normal');
    doc.addFileToVFS('Exo-Bold-bold.ttf', Boldfont);
    doc.addFont('Exo-Bold-bold.ttf', 'Exo-Bold', 'bold');
    res.forEach((el, index) => {
      doc.addPage();
      doc.addImage(hatchLabLogoBase64, 'JPEG', (pageWidth / 2) - 30, 2, 60, 20, undefined, 'FAST');
      // let HeaderName = res.length > 0 ? res[0]?.unitName : ''
      let HeaderName = ''
      let reg_address = "DD 18/7, 5th Floor, Salt Lake City, Sector 1, Kolkata 700064, West Bengal, India";
      let emailId = "info@hatchlabinnovations.com";
      let contactNo = "+91 82760 57111 ";
      let CIN = "U66190WB2023PTC263955";
      doc.setFontSize(8)
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.text(header_1, pageWidth / 3.8, 25, { align: 'center' });
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828');
      doc.setFontSize(8)
      doc.text(reg_address, (pageWidth / 2.2) + doc.getTextDimensions(header_1).w, 25, { align: 'center' });
      doc.setFontSize(8)
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.text(header_2, pageWidth / 5, 27 + doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828');
      doc.setFontSize(8)
      doc.text(emailId, (pageWidth / 4.8) + doc.getTextDimensions(header_1).w, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.text(pipe, (pageWidth / 5.2) + doc.getTextDimensions(header_2).w + doc.getTextDimensions(emailId).w, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828');
      doc.setFontSize(8)
      doc.text(header_3, (pageWidth / 4.4) + doc.getTextDimensions(header_2).w + doc.getTextDimensions(emailId).w, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828');
      doc.setFontSize(8)
      doc.text(contactNo, (pageWidth / 3.8) + doc.getTextDimensions(header_2).w + doc.getTextDimensions(emailId).w + doc.getTextDimensions(header_3).w, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.text(pipe, (pageWidth / 4.9) + doc.getTextDimensions(header_2).w + doc.getTextDimensions(emailId).w + doc.getTextDimensions(header_3).w + doc.getTextDimensions(contactNo).w + 4, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828');
      doc.setFontSize(8)
      doc.text(header_4, (pageWidth / 2.5) + doc.getTextDimensions(header_2).w + doc.getTextDimensions(emailId).w, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828');
      doc.setFontSize(8)
      doc.text(CIN, (pageWidth / 2.5) + doc.getTextDimensions(header_2).w + doc.getTextDimensions(emailId).w + doc.getTextDimensions(header_3).w + doc.getTextDimensions(header_4).w  + 6, 27+ doc.getTextDimensions(header_1).h, { align: 'center' });
      doc.setLineWidth(0.5);
      doc.line(16, doc.getTextDimensions(header_1).h + 30, pageWidth - 16, doc.getTextDimensions(header_1).h + 30);
      const headerTxtDimen = doc.getTextDimensions(HeaderName);
      let FormerlyKnownAs = "";
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.setFontSize(8)
      doc.text(FormerlyKnownAs, pageWidth / 2, headerTxtDimen.h + 10, { align: 'center' });
      const FormerlyKnownAsDimen = doc.getTextDimensions(FormerlyKnownAs);
      let height = doc.getTextDimensions(header_1).h + doc.getTextDimensions(header_2).h + 35
      let address = `SALARY SLIP`;
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.setFontSize(10)
      doc.text(`${address}`.toUpperCase(), pageWidth / 2, FormerlyKnownAsDimen.h + headerTxtDimen.h + height, { align: 'center' });
     
      const addressDimen = doc.getTextDimensions(address);
      // let empNameTitle = "Employee Name : ";
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.setFontSize(8)
      const empNameTitleDimen = doc.getTextDimensions(row1_col1_title);
      doc.text(`${row1_col1_title}`, 16, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h + 28, { align: 'center' });
      doc.text(`${row1_col2_title}`, pageWidth / 1.22, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h + 28, { align: 'right' });
      doc.text(`${row2_col1_title}`, 13.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + 28 + empNameTitleDimen.h, { align: 'center' });
      doc.text(`${row2_col2_title}`, pageWidth / 1.305, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + 28 + empNameTitleDimen.h, { align: 'left' });
      doc.text(`${row3_col1_title}`, 4.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      doc.text(`${row3_col2_title}`, pageWidth /  1.365, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
       doc.text(`${row4_col1_title}`, 4.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row3_col1_title).h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row1_col1_title).h, { align: 'left' });
      doc.text(`${row4_col2_title}`, pageWidth /  1.337, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row3_col1_title).h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row1_col1_title).h, { align: 'left' });
      const totalWorkingDay = el.salaryProcessDetailRequestList.find(item => item.isTotalWorkingDayHead);
      doc.setFont('Exo2-Medium', 'normal')
      doc.setTextColor('#282828')
      doc.setFontSize(7)
      doc.text(`${el.name}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h + 28, { align: 'left' });
      doc.text(`${el.bankName}`, (pageWidth / 1.39) + empNameTitleDimen.w, FormerlyKnownAsDimen.h + headerTxtDimen.h + 17 + addressDimen.h + 28, { align: 'left' });
      doc.text(`${el.designationName}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + 28 + empNameTitleDimen.h, { align: 'left' });
      doc.text(`${el.bankBranch}`, (pageWidth / 1.39) + empNameTitleDimen.w, FormerlyKnownAsDimen.h + headerTxtDimen.h + 20 + addressDimen.h + 28 + empNameTitleDimen.h, { align: 'left' });
      doc.text(`${moment({year : el?.year , month:el.month}).subtract(1, 'months').format("MMM'YY")}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      doc.text(`${el.accNo ? el.accNo : 'N/A'}`, (pageWidth / 1.202), FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h, { align: 'left' });
      doc.text(`${totalWorkingDay ? totalWorkingDay?.amount : 0}`, empNameTitleDimen.w * 1.3, FormerlyKnownAsDimen.h + headerTxtDimen.h + 24 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row3_col1_title).h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row1_col1_title).h, { align: 'left' });
      doc.text(`${el?.ifscCode ? el?.ifscCode : 'N/A'}`, pageWidth / 1.202, FormerlyKnownAsDimen.h + headerTxtDimen.h + 24 + addressDimen.h + 28 + empNameTitleDimen.h + doc.getTextDimensions(row3_col1_title).h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row1_col1_title).h, { align: 'left' });
      const earning = el.salaryProcessDetailRequestList.filter(item => item.isEarning && item.isPrinted);
      const deduction = el.salaryProcessDetailRequestList.filter(item => item.isPrinted && !item.isEarning);
      console.log(deduction);  
      const calculatedINR = earning.filter(head => head.isCalculative).map(i => Number(i.amount));
      const sumOfCalculatedINR = calculateSumOfArray(calculatedINR);
      const ctc = calculateSumOfArray(earning.filter(el => !el.isNetPayHead).map(el => el.amount));
      const deduct = deduction.map(j => Number(j.amount))
      const calculatedDeduction = calculateSumOfArray(deduct);
      
      // const totalDeduction = deduction.find(el => el.earningDeductionId == 41); // earning Deduction Id Of Total Deduction
      const netAmt = earning.find(el => el.isNetPayHead);
       const amtinWord = convertNumberToWords(netAmt ? (Number(netAmt?.amount)) : 0);
      // const company_to_company = (netAmt ? (Number(netAmt?.amount)) : 0) + (totalDeduction ? Number(totalDeduction?.amount) : 0)
      let foot = [
          [
          { content: "Total Addition", colSpan: 1, rowSpan: 1, styles: { halign: 'right', styles: { halign: 'center',fontSize:10, font: 'Exo-Bold' } } },
          { content: ctc ? ctc?.toFixed(2) : 0.00, colSpan: 1, rowSpan: 1, styles: { halign: 'right', styles: { halign: 'center', font: 'Exo2-Medium' } } },
          { content: "Total Deduction", colSpan: 1, rowSpan: 1, styles: { halign: 'right',fontSize:10, font: 'Exo-Bold' } },
          { content:calculatedDeduction ? calculatedDeduction?.toFixed(2) : 0.00, colSpan: 1, rowSpan: 1, styles: { halign: 'right' } },
        ],
        [
          { content: "", colSpan: 1, rowSpan: 1, styles: { halign: 'right', styles: { halign: 'center',fontSize:10, font: 'Exo-Bold' } } },
          { content: "", colSpan: 1, rowSpan: 1, styles: { halign: 'right', styles: { halign: 'center', font: 'Exo-Bold' } } },
          { content: "NET PAY", colSpan: 1, rowSpan: 1, styles: { halign: 'left',fontSize:10, font: 'Exo-Bold' } },
          { content:netAmt ? netAmt?.amount : 0.00, colSpan: 1, rowSpan: 1, styles: { halign: 'right' } }
        ]
      ];
      let arr = [];
      let isEarning = earning.filter(el => !el.isNetPayHead).map(ele => [ele.earningDeductionPrintName, ele.amount]);
      let isDeduction = deduction.map(ele => [ele.earningDeductionPrintName, ele.amount]);
      arr = meregeArrayIndexWise(isEarning, isDeduction,true);
      // console.log(arr);
      // console.log(arr);  
      autoTable(doc, {
        didDrawCell: (data) => {
          // Add dotted horizontal borders to the body cells
          if (data.row.index >= 0 && data.row.index !== 0) {  // Exclude header row
            const cell = data.cell;
            const x = cell.x;
            const y = cell.y + cell.height; // Position at the bottom of the cell
            const width = cell.width;
            doc.setLineWidth(0.4);
            doc.setDrawColor(250, 250, 250);
            doc.setLineDash([0.6, 0.6]);
            doc.line(x, y, x + width, y);
            doc.setLineDash([0.1]);
          }
        },
        rowPageBreak: true,
        tableWidth: doc.internal.pageSize.getWidth() - 6,
        margin: {
          left: 3,
          top: FormerlyKnownAsDimen.h + headerTxtDimen.h + 28 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row3_col1_title).h  + doc.getTextDimensions(row4_col1_title).h + 30
        },
        theme: 'striped',
        styles: {
          font: 'Exo-Bold',
          fontStyle: 'bold',
          fontSize: 9,
          lineColor: [82, 82, 82],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          halign: 'center',
          fontSize: 7,
          font: 'Exo-Bold'
        },
        bodyStyles: {
          fontSize: 7,
          halign: 'left',
          font: 'Exo-Bold',
          textColor: [0, 0, 0],
        },
        footStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          // fontSize: 7
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0]
        },
        body: arr,
        head: [
          [
            { content: 'Earnings', colSpan: 1, styles: { } },
            { content: 'Amount', colSpan: 1,styles: { halign:'right'}},
            { content: 'Deduction', colSpan: 1 },
            { content: 'Amount', colSpan: 1,styles: { halign:'right'}}
          ],
        ],
        foot: foot
      })
      
      doc.setFont('Exo-Bold', 'bold')
      doc.setTextColor('#282828')
      doc.setFontSize(9)
      doc.text(`${amtinWord} Only`,3,doc.lastAutoTable.finalY + 5)
      doc.setFontSize(9)
      doc.text(`This is system generated document and does not require signature`,pageWidth / 2,doc.lastAutoTable.finalY + 20)
    })

    doc.setDocumentProperties({
      title: 'Payslip Statement',
      author: "Techno India - HatchLab Innovations",
      creator: "Techno India - HatchLab Innovations"
    })
    doc?.output('dataurlnewwindow',{
      filename:'Payslip Statement For HatchLab'
    })
  }
  catch (err) {
    console.log(err);
  }
}


export const generateDummyPaySlipReportForNehuru = async (res,font,Boldfont) =>{
    try{
      console.log(res);
      const doc = new jsPDF();
      doc.addFileToVFS('Exo2-Medium-normal.ttf', font);
      doc.addFont('Exo2-Medium-normal.ttf', 'Exo2-Medium', 'normal');
      doc.addFileToVFS('Exo-Bold-bold.ttf', Boldfont);
      doc.addFont('Exo-Bold-bold.ttf', 'Exo-Bold', 'bold');
      doc.setFontSize(14);
      doc.deletePage(1);
      res.forEach((el, index) => {

        const earningDtls = el.salaryProcessDetailRequestList?.filter(el => el.isEarning && el.isPrinted).sort((a, b) => a.sequenceInPorcess - b.sequenceInPorcess);
        const deductionDtls = el.salaryProcessDetailRequestList?.filter(el => !el.isEarning  && el.isPrinted).sort((a, b) => a.sequenceInPorcess - b.sequenceInPorcess);
        let dt = [];
        if(earningDtls.length >=deductionDtls.length){
              dt = earningDtls.map((el,index) => {
                const earningDeduction_amount = el?.amount?.toFixed(2);
                const deduction = deductionDtls[index] || null;
                return [
                  { content: index + 1, colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
                  { content: el?.earningDeductionPrintName, colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: earningDeduction_amount, colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
                  { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: deduction ? deduction?.earningDeductionPrintName : '-' , colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: deduction ? deduction?.amount?.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
                ]
              })
        }
        else{
            dt = deductionDtls.map((el,index) => {
                const deduction_amount = el?.amount?.toFixed(2);
                const earning_dtls = earningDtls[index] || null;
                return [
                  { content: index + 1, colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
                  { content: earning_dtls ? earning_dtls?.earningDeductionPrintName : '-' , colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: earning_dtls ? earning_dtls?.amount?.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
                  { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: el?.earningDeductionPrintName, colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: deduction_amount, colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
                  { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
                ]
              })
        }
        const netamountPayable = el?.netAmount.toFixed(2);
        const amtinWord = convertNumberToWords(netamountPayable);
        const absent =  el.totalPresentDay - el.totalWorkingDay;
        doc.addPage();
        doc.autoTable({
         rowPageBreak: true,
        tableWidth: doc.internal.pageSize.getWidth() - 6,
        margin: {
          left: 3,
          // top: FormerlyKnownAsDimen.h + headerTxtDimen.h + 23 + addressDimen.h + empNameTitleDimen.h + doc.getTextDimensions(row2_col1_title).h + doc.getTextDimensions(row3_col1_title).h
        },
        theme: 'striped',
        styles: {
          font: 'Exo-Bold',
          fontStyle: 'bold',
          fontSize: 9,
          lineColor: [82, 82, 82],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          halign: 'center',
          fontSize: 9,
          font: 'Exo-Bold'
        },
        bodyStyles: {
          halign: 'left',
          textColor: [0, 0, 0],
        },
        footStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 7
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0]
        },
        head: [
          [
            { content: 'Nehru Memorial Techno Global Hospital', colSpan: 8, styles: { halign: 'center' }},
          ],
          [
            { content: `Pay Slip for the Month ${ moment({year : el?.year , month:el.month}).subtract(1, 'months').format("MMM'YY")}`, colSpan: 8, styles: { halign: 'center' }},
          ]
        ],
        body: [
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:28}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:32}},
            { content: '', colSpan: 1, styles: { halign: 'start' }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
           [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'Attendance details', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize: 8}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: 'Name of Employee', colSpan: 1, styles: { halign: 'start',cellWidth:32,fontSize: 8}},
            { content: el?.name, colSpan: 1, styles: { halign: 'start',fontSize: 8, font: 'Exo2-Medium',fontStyle: 'normal'}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
           [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'Absent', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize: 8}},
            { content: absent || '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: 'Designation', colSpan: 1, styles: { halign: 'start',cellWidth:32,fontSize: 8}},
            { content: el?.designationName, colSpan: 1, styles: { halign: 'start',fontSize: 8, font: 'Exo2-Medium',fontStyle: 'normal'}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16 }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18 }},
          ],
           [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'Calender', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize: 8}},
            { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: 'Banking details', colSpan: 1, styles: { halign: 'start',cellWidth:32,fontSize: 8}},
            { content: el?.bankName ? el?.bankName : '-', colSpan: 2, styles: { halign: 'start',fontSize: 8, font: 'Exo2-Medium',fontStyle: 'normal'}},
            // { content: '', colSpan: 1, styles: { halign: 'center' }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'Overtime', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize: 8}},
            { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: 'Date of Joining', colSpan: 1, styles: { halign: 'start',cellWidth:32,fontSize: 8}},
            { content: el?.doj ? moment(el.doj).format('D-MMM-YY') : '-', colSpan: 1, styles: { halign: 'start',fontSize: 8, font: 'Exo2-Medium',fontStyle: 'normal'}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16 }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18 }},
          ],
           [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'Present', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize: 8}},
            { content: el?.totalPresentDay || 0, colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: 'Emplyee Code', colSpan: 1, styles: { halign: 'start',cellWidth:32,fontSize: 8}},
            { content: el?.employeeCode, colSpan: 1, styles: { halign: 'start',fontSize: 8, font: 'Exo2-Medium',fontStyle: 'normal'}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16 }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18 }},
          ],
          [
            { content: 'SL No.', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
            { content: 'Earning', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize: 8}},
            { content: 'Amount', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
            { content: 'Gross Salary', colSpan: 1, styles: { halign: 'center',cellWidth:20,fontSize: 8}},
            { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32,fontSize: 8}},
            { content: 'Deduction', colSpan: 1, styles: { halign: 'start',fontSize: 8}},
            { content: 'Amount', colSpan: 1, styles: { halign: 'end',cellWidth:16,fontSize: 8}},
            { content: 'Net Salary', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          ],
          //  [
          //   { content: '1', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'Basic', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: basicDtls ? basicDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'Employees EPF', colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: pfDtls ? pfDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          // [
          //   { content: '2', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'HRA', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: hraDtls ? hraDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'Employees ESI', colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: esiDtls ? esiDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          //  [
          //   { content: '3', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'Conveyance', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: conveyanceDtls ? conveyanceDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'Professional Tax', colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: professionalTaxDtls ? professionalTaxDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          // [
          //   { content: '4', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'Medical', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: medicalDtls ? medicalDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'ITDS', colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          //  [
          //   { content: '5', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'Other Variable Pay', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: otherAllowenceDtls ? otherAllowenceDtls?.amount?.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'Hostel Rent', colSpan: 1, styles: { halign: 'start', font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          // [
          //   { content: '6', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'Extra Allowance', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: extraAllowenceDtls ? extraAllowenceDtls?.amount?.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'Other varibale', colSpan: 1, styles: { halign: 'start',fontSize: 8}},
          //   { content: otherDeductionsDtls ? otherDeductionsDtls?.amount : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          ...dt,
          // [
          //   { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12,fontSize: 8}},
          //   { content: 'Total Earning', colSpan: 1, styles: { halign: 'center',cellWidth:28, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:16,fontSize: 8}},
          //   { content: totalEarning ? totalEarning?.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:20, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: 'Total Deduction', colSpan: 1, styles: { halign: 'center',fontSize: 8}},
          //   { content: totalDeductionsDtls ? totalDeductionsDtls?.amount.toFixed(2) : '-', colSpan: 1, styles: { halign: 'right',cellWidth:16, font: 'Exo2-Medium',fontStyle: 'normal',fontSize: 8}},
          //   { content: '0', colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize: 8}},
          // ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:28}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:32}},
            { content: '', colSpan: 1, styles: { halign: 'start' }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'Amount In wards', colSpan: 1, styles: { halign: 'center',cellWidth:28,fontSize:7}},
            { content: amtinWord, colSpan: 3, styles: { halign: 'center',cellWidth:16,fontSize:7}},
            { content: 'Net Amount Payable', colSpan: 2, styles: { halign: 'center',fontSize:7}},
            { content: netamountPayable, colSpan: 1, styles: { halign: 'center',cellWidth:18,fontSize:7}},
          ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'ESI No.', colSpan: 1, styles: { halign: 'left',cellWidth:28,fontSize:7}},
            { content: el?.esiNo || '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:32}},
            { content: '', colSpan: 1, styles: { halign: 'start' }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: 'PF No.', colSpan: 1, styles: { halign: 'left',cellWidth:28,fontSize:7}},
            { content: el?.pfNo || '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:32}},
            { content: '', colSpan: 1, styles: { halign: 'start' }},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: '', colSpan: 1, styles: { halign: 'left',cellWidth:28}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: '', colSpan: 1, styles: { halign: 'start',cellWidth:32}},
            { content: 'For', colSpan: 1, styles: { halign: 'left',font:'Exo2-Medium',fontStyle:'normal'}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
          [
            { content: '', colSpan: 1, styles: { halign: 'center' ,cellWidth:12}},
            { content: '', colSpan: 1, styles: { halign: 'left',cellWidth:28}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:20}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:32}},
            { content: 'Nehru Memorial Techno Global Hospital', colSpan: 1, styles: { halign: 'left',font:'Exo2-Medium',fontStyle:'normal'}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:16}},
            { content: '', colSpan: 1, styles: { halign: 'center',cellWidth:18}},
          ],
        ]
        });
      })
      doc.setDocumentProperties({
        title: 'Payslip Statement',
        author: "Nehuru Hospital",
        creator: "Nehuru Hospital"
      })
      doc.output('dataurlnewwindow')
    }
    catch(err){
      console.log(err) 
    }
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

export const getMenusByActionURL = (actionURL,rawMenus) =>{
    try{
      console.log(rawMenus);
      console.log(actionURL);
      const menuDtls = rawMenus?.find(el => el.actionUrl == actionURL);
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

 