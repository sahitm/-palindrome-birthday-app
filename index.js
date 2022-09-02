const birthday = document.querySelector('#birthday')
const show = document.querySelector('#show')
const message = document.querySelector('#message') 

function reverseString(str) {
    let reversedStr = str.split("").reverse().join("");
    return reversedStr;
}

function isPalindrome(str) {
    let reversedStr = reverseString(str);
    return str === reversedStr;
}

function getDateAsString(date) {
    let dateInStr = { day: "", month: "", year: "" };

    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }

    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
  
    return dateInStr;
}

function dateVariations(date) {
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    let dateFormatList = dateVariations(date);
    let palindromeList = [];
  
    for (i = 0; i < dateFormatList.length; i++) {
      let result = isPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
}

function leapYear(year) {
    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (leapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
  
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    }
}

function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let noOfDays = 0;
  
    while (1) {
      noOfDays++;
      let dateStr = getDateAsString(nextDate);
      let resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [noOfDays, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (leapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
}
  
function getPreviousPalindromeDate(date) {
  
    let previousDate = getPreviousDate(date);
    let noOfDays = 0;
  
    while (1) {
      noOfDays++;
      let dateStr = getDateAsString(previousDate);
      let resultList = checkPalindromeForAllDateFormats(dateStr);
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [noOfDays, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
}

function handleSubmit() {
    console.log('clicked')
    let bdayStr = birthday.value;
  
    if(bdayStr !== ''){
      var date = bdayStr.split('-');
      let yyyy = date[0];
      let mm = date[1];
      let dd = date[2];
  
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
      };
  
      let dateStr = getDateAsString(date);
      let list = checkPalindromeForAllDateFormats(dateStr);
      let isItPalindrome = false;
  
      for (let i = 0; i < list.length; i++){
        if(list[i]){
          isItPalindrome = true;
          break;
        }
      } 
  
      if(!isItPalindrome) {
        const [noOfDays1, nextDateShow] = getNextPalindromeDate(date);
        const [noOfDays2, prevDateShow] = getPreviousPalindromeDate(date);
  
        if(noOfDays1 > noOfDays2) {
            message.innerHTML = `The nearest Palindrome date is ${prevDateShow.day}-${prevDateShow.month}-${prevDateShow.year}, you missed by ${noOfDays2} days.`
        }
        else {
            message.innerHTML = `The nearest Palindrome date is ${nextDateShow.day}-${nextDateShow.month}-${nextDateShow.year}, you missed by ${noOfDays1} days.`
        }
      }
      else {
        message.innerHTML = `Your birthday is a Palindrome!!!`;
      }
    }else{
        message.innerHTML = `Invalid Data`;
    }
}

show.addEventListener('click',handleSubmit)