/*
This code contains a class which handles time and date.
*/

// Imports.
const HebrewDate = require("hebrew-date");

// Constants.
const gregMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"];
const cyprianMonths = ["Pri", "Sec", "Ter", "Qua", "Qui", "Sex", "Sep",
                       "Oct", "Nov", "Dec", "Uno", "Duo", "Int"];
const currentMonarchCode = "T", currentMonarchHebrewYearDiff = 5773;
const roshHashanahMonthNo = 7; indexOfNisan = 8, noOfHebrewMonths = 13;
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthLengths2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInAWeek = 7, leapYearInterval = 4, monthsInAYear = 12,
      centuryInterval = 100;
const allSaintsEve = [31, 9], allSaints = [1, 10], allSouls = [2, 10],
      earliestAdventSunday = [27, 10], christmas = [25, 11];
const daysInLent = 46, easterToAscension = 39, easterToPentecost = 49,
      daysOfChristmas = 12, daysInFirstWeekOfLent = 4;

// The class in question.
class Timings
{
  constructor()
  {

  }

  // For debugging purposes.
  getUTCTimestamp()
  {
    var date = new Date();
    var result = date.toISOString();

    return result;
  }

  // Get a (Gregorian) date string, formatted just how I like it.
  getMyGreg()
  {
    var greg = new Date();
    var dayNum, monthNum, yearNum;
    var result, dayString, monthString, yearString;

    dayNum = greg.getUTCDate();
    monthNum = greg.getUTCMonth();
    yearNum = greg.getUTCFullYear();

    dayString = dayNum.toString();
    if(dayString.length === 1) dayString = "0"+dayString;
    monthString = gregMonths[monthNum];
    yearString = yearNum.toString();
    result = dayString+" "+monthString+" "+yearString;

    return result;
  }

  // Takes in the necessary input, and outputs an HTML string giving the
  // Cyprian date.
  packCyprianDate(dayNum, monthNumeral, monarchCode, yearInMonarchReign)
  {
    var monthOrdinal = monthNumeral-1;
    var dayString, monthString, yearNumString, result;

    dayString = dayNum.toString();
    if(dayString.length === 1) dayString = "0"+dayString;
    monthString = cyprianMonths[monthOrdinal];
    yearNumString = yearInMonarchReign.toString();

    result = dayString+" "+monthString+" "+packMonarchCode(monarchCode)+
             "<sub>"+yearNumString+"</sub>";

    return result;
  }

  // Return a string giving the Cyprian date.
  getCyprian()
  {
    var cyprianDate = new CyprianDate();
    var result = this.packCyprianDate(cyprianDate.dayNum,
                                      cyprianDate.monthNum,
                                      currentMonarchCode,
                                      cyprianDate.year);

    return result;
  }

  // Returns a string giving the date in the Sacred calendar.
  getSacred()
  {
    var sacredDate = new SacredDate();
    var result = sacredDate.dateString;

    return result;
  }

  // Returns a string giving today's colour according to the Sacred
  // calendar.
  getSacredColour()
  {
    var sacredDate = new SacredDate();
    var result = sacredDate.colour;

    return result;
  }
}

// A class to hold the Cyprian date.
class CyprianDate
{
  constructor()
  {
    var date = new Date();

    this.hebrewDate = new HebrewDate(date.getUTCFullYear(),
                                     date.getUTCMonth()+1,
                                     date.getUTCDate());
    this.year = this.getCyprianYear();
    this.monthNum = this.getCyprianMonth();
    this.dayNum = this.hebrewDate.date;

//    this.testAdar();
  }

  getCyprianMonth()
  {
    var result = this.hebrewDate.month;

    result = result-indexOfNisan+1;
    result = result+noOfHebrewMonths;
    result = result%noOfHebrewMonths;

    return result;
  }

  getCyprianYear()
  {
    var result = this.hebrewDate.year-currentMonarchHebrewYearDiff;

    if(this.monthNum >= roshHashanahMonthNo) result = result-1;

    return result;
  }

  testAdar()
  {
    var testDateA = new HebrewDate(2014, 7, 1);
    var testDateB = new HebrewDate(2015, 3, 1);
    var testDateC = new HebrewDate(2016, 3, 1);
    var testDateD = new HebrewDate(2016, 4, 1);

    console.log(testDateA);
    console.log(testDateB);
    console.log(testDateC);
    console.log(testDateD);
  }
}

// Handles today's liturgical date.
class SacredDate
{
  constructor()
  {
    var date = new Date();
    var weekdayName = weekdayNames[date.getUTCDay()];

    this.gregorian = { day: date.getUTCDate(),
                       month: date.getUTCMonth(),
                       year: date.getUTCFullYear(),
                       weekday: weekdayName };
    this.easter = this.buildEaster();
    this.epiphany = this.buildEpiphany();
    this.ashWednesday = this.buildAshWednesday();
    this.pentecost = this.buildPentecost();
    this.adventSunday = this.buildAdventSunday();
    this.seasonal = this.buildSeasonal();
    this.season = this.buildSeason();
    this.dateString = this.season.dateString;
    this.colour = this.season.colour;
  }

  static isLeapYear(y)
  {
    if(y%centuryInterval === 0) return(false);
    else if(y%leapYearInterval === 0) return(true);
    else return(false);
  }

  // Calculates Date B, which is N days before Date A.
  static subtractDays(a, n, y)
  {
    var ml = monthLengths;
    var j0 = 1;
    var count = 0;

    if(SacredDate.isLeapYear(y)) ml = monthLengths2;

    for(var i = a[1]; i >= 0; i--)
    {
      if(i === a[1]) j0 = a[0];
      else j0 = ml[i];

      for(var j = j0; j >= 1; j--)
      {
        if(count === n) return([j, i]);
        count++;
      }
    }
    return([0, 0]);
  }

  // Calculates Date B, which is N days after Date A.
  static addDays(a, n, y)
  {
    var ml = monthLengths;
    var j0 = 1;
    var count = 0;

    if(SacredDate.isLeapYear(y)) ml = monthLengths2;

    for(var i = a[1]; i < monthsInAYear; i++)
    {
      if(i === a[1]) j0 = a[0];
      else j0 = 1;

      for(var j = j0; j <= ml[i]; j++)
      {
        if(count === n) return([j, i]);
        count++;
      }
    }
    return([0, 0]);
  }

  static fallsOn(a, b)
  {
    if(a[0] !== b[0]) return(false);
    else if(a[1] !== b[1]) return(false);
    else return(true);
  }

  static isBefore(a, b)
  {
    if(a[1] > b[1]) return(false);
    else if((a[1] === b[1]) && (a[0] >= b[0])) return(false);
    else return(true);
  }

  static daysAfter(a, b, y)
  {
    var count = 0;
    var j0 = 1, jn = 1;
    var ml = monthLengths;

    if(SacredDate.isLeapYear(y)) ml = monthLengths2;

    for(var i = a[1]; i <= b[1]; i++)
    {
      if(i === a[1]) j0 = a[0];
      else j0 = 1;

      if(i === b[1]) jn = b[0];
      else jn = ml[i]

      for(var j = j0; j <= jn; j++)
      {
        count++;
      }
    }

    return(count);
  }

  static nToNth(n)
  {
    var suffix = "th", nString = n.toString(), result = "";

    if(nString.endsWith("1")) suffix = "st";
    else if(nString.endsWith("2")) suffix = "nd";
    else if(nString.endsWith("3")) suffix = "rd";

    result = nString+suffix;

    return(result);
  }

  buildEaster()
  {
    var y = this.gregorian.year;

    return(gitHubGetEaster(y));
  }

  buildEpiphany()
  {
    var y = this.gregorian.year;
    var weekday01Jan = sakamotoGetWeekday(y, 1, 1);
    var delay = daysInAWeek-weekday01Jan;
    var result = [delay+1, 0];

    return(result);
  }

  buildAshWednesday()
  {
    var y = this.gregorian.year;
    var result = SacredDate.subtractDays(this.easter, daysInLent, y);

    return(result);
  }

  buildPentecost()
  {
    var y = this.gregorian.year;
    var result = SacredDate.addDays(this.easter, easterToPentecost, y);

    return(result);
  }

  buildAdventSunday()
  {
    var christmasWeekday = sakamotoGetWeekday(this.gregorian.year,
                                              christmas[1]+1,
                                              christmas[0]);
    var n = 0;
    var result = [];

    if(christmasWeekday !== 0) n = daysInAWeek-christmasWeekday;

    result = SacredDate.addDays(earliestAdventSunday, n,
                                this.gregorian.year);

    return(result);
  }

  buildSeasonal()
  {
    var seasonal = "After Pentecost";
    var today = [this.gregorian.day, this.gregorian.month];

    if(SacredDate.fallsOn(this.adventSunday, today) ||
       (SacredDate.isBefore(this.adventSunday, today) &&
        SacredDate.isBefore(today, christmas)))
    {
      seasonal = "Advent";
    }
    else if(SacredDate.fallsOn(christmas, today) ||
            (SacredDate.isBefore(christmas, today) &&
             SacredDate.isBefore(today, this.epiphany)) ||
            SacredDate.fallsOn(this.epiphany, today))
    {
      seasonal = "Christmas";
    }
    else if(SacredDate.isBefore(this.epiphany, today) &&
            SacredDate.isBefore(today, this.ashWednesday))
    {
      seasonal = "After Epiphany";
    }
    else if(SacredDate.fallsOn(this.ashWednesday, today) ||
            (SacredDate.isBefore(this.ashWednesday, today) &&
             SacredDate.isBefore(today, this.easter)))
    {
      seasonal = "Lent";
    }
    else if(SacredDate.fallsOn(this.easter, today) ||
            (SacredDate.isBefore(this.easter, today) &&
             SacredDate.isBefore(today, this.pentecost)) ||
            SacredDate.fallsOn(today, this.pentecost))
    {
      seasonal = "Easter";
    }

    return(seasonal);
  }

  buildSeason()
  {
    if(this.seasonal === "Advent")
    {
      return(new Advent(this.gregorian, this.adventSunday));
    }
    else if(this.seasonal === "Christmas")
    {
      return(new Christmas(this.gregorian, this.epiphany));
    }
    else if(this.seasonal === "After Epiphany")
    {
      return(new AfterEpiphany(this.gregorian, this.epiphany));
    }
    else if(this.seasonal === "Lent")
    {
      return(new Lent(this.gregorian, this.ashWednesday, this.easter));
    }
    else if(this.seasonal === "Easter")
    {
      return(new Easter(this.gregorian, this.easter, this.pentecost));
    }
    else return(new AfterPentecost(this.gregorian, this.pentecost));
  }
}

// Handles the data specific to Advent.
class Advent
{
  constructor(gregorian, adventSunday)
  {
    this.gregorian = gregorian;
    this.adventSunday = adventSunday;
    this.week = this.buildWeek();
    this.dateString = this.buildDateString();
    this.colour = "violet";
  }

  buildWeek()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var daysAfterAdventSunday = SacredDate.daysAfter(this.adventSunday,
                                  today, this.gregorian.year);
    var weekNo = daysAfterAdventSunday-(daysAfterAdventSunday%daysInAWeek);

    weekNo = weekNo/daysInAWeek;
    weekNo = weekNo+1;

    return(weekNo);
  }

  buildDateString()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var weekday = this.gregorian.weekday;
    var result = weekday+" of the "+SacredDate.nToNth(this.week)+
                         " week of Advent";

    if(SacredDate.fallsOn(this.adventSunday, today))
    {
      result = "Advent Sunday";
    }

    return(result);
  }
}

// Handles the data specific to the season of Christmas.
class Christmas
{
  constructor(gregorian, epiphany)
  {
    this.gregorian = gregorian;
    this.epiphany = epiphany;
    this.dayOfChristmas = this.buildDayOfChristmas();
    this.dateString = this.buildDateString();
    this.colour = "white";
  }

  buildDayOfChristmas()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var daysAfterChristmas = SacredDate.daysAfter(christmas, today,
                               this.gregorian.year);
    var doc = 0;

    if((daysAfterChristmas >= 0) &&
       (daysAfterChristmas <= daysOfChristmas-1))
    {
      doc = daysAfterChristmas+1;
    }

    return(doc);
  }

  buildDateString()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var result = SacredDate.nToNth(this.dayOfChristmas)+" day of Christmas";

    if(SacredDate.fallsOn(christmas, today))
    {
      result = "The Feast of the Incarnation";
    }
    else if(SacredDate.fallsOn(this.epiphany, today))
    {
      result = "The Feast of the Epiphany";
    }
    else if(this.dayOfChristmas === 0)
    {
      result = this.gregorian.weekday+" before Epiphany";
    }

    return(result);
  }
}

// Handles the data specific to the period of Ordinary Time after the
// season of Christmas.
class AfterEpiphany
{
  constructor(gregorian, epiphany)
  {
    this.gregorian = gregorian;
    this.epiphany = epiphany;
    this.week = this.buildWeek();
    this.dateString = this.buildDateString();
    this.colour = "green";
  }

  buildWeek()
  {
    // This assumes that we're using the definition of Epiphany wherein it
    // always falls on a Sunday.
    var today = [this.gregorian.day, this.gregorian.month];
    var result = SacredDate.daysAfter(this.epiphany, today,
                                      this.gregorian.year);

    result = result-(result%daysInAWeek);
    result = result/daysInAWeek;
    result = result+1;

    return(result);
  }

  buildDateString()
  {
    var result = this.gregorian.weekday+" of the "+
                 SacredDate.nToNth(this.week)+" week after Epiphany";

    return(result);
  }
}

// Handles the data specific to Lent.
class Lent
{
  constructor(gregorian, ashWednesday, easter)
  {
    this.gregorian = gregorian;
    this.ashWednesday = ashWednesday;
    this.easter = easter;
    this.palmSunday = this.buildPalmSunday();
    this.goodFriday = this.buildGoodFriday();
    this.week = this.buildWeek();
    this.dateString = this.buildDateString();
    this.colour = this.buildColour();
  }

  buildPalmSunday()
  {
    var y = this.gregorian.year;
    var result = SacredDate.subtractDays(this.easter, daysInAWeek, y);

    return(result);
  }

  buildGoodFriday()
  {
    var y = this.gregorian.year;
    var result = SacredDate.subtractDays(this.easter, 2, y);

    return(result);
  }

  buildWeek()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var daysAfterAshWednesday =
          SacredDate.daysAfter(this.ashWednesday, today,
                               this.gregorian.year);
    var result = 0;

    if(daysAfterAshWednesday < daysInFirstWeekOfLent) result = 1;
    else
    {
      result = daysAfterAshWednesday-daysInFirstWeekOfLent;
      result = result-(result%daysInAWeek);
      result = result/daysInAWeek;
      result = result+2;
    }

    return(result);
  }

  buildDateString()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var result = this.gregorian.weekday+" of the "+
                 SacredDate.nToNth(this.week)+" week of Lent";

    if(SacredDate.fallsOn(this.ashWednesday, today))
    {
      result = "Ash Wednesday";
    }
    else if(SacredDate.fallsOn(this.palmSunday, today))
    {
      result = "Palm Sunday";
    }
    else if(SacredDate.fallsOn(this.goodFriday, today))
    {
      result = "Good Friday";
    }
    else if(SacredDate.isBefore(this.palmSunday, today))
    {
      result = "Holy "+this.gregorian.weekday;
    }

    return(result);
  }

  buildColour()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var result = "violet";

    if(SacredDate.fallsOn(this.palmSunday, today) ||
       SacredDate.isBefore(this.palmSunday, today))
    {
      result = "red";
    }

    return(result);
  }
}

// Handles the data specific to the season of Easter.
class Easter
{
  constructor(easter, pentecost)
  {
    this.easter = easter;
    this.pentecost = pentecost;
    this.ascension = buildAscension();
    this.week = buildWeek();
    this.dateString = buildDateString();
    this.colour = buildColour();
  }

  buildAscension()
  {
    var y = this.gregorian.year;
    var result = SacredDate.addDays(this.easter, easterToAscension, y);

    return(result);
  }

  buildWeek()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var daysAfterPentecost = SacredDate.daysAfter(this.pentecost, today,
                               this.gregorian.year);
    var result = 0;

    result = daysAfterPentecost-(daysAfterPentecost%daysInAWeek);
    result = result/daysInAWeek;
    result = result+1;

    return(result);
  }

  buildDateString()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var result = this.gregorian.weekday+" of the "+
                 SacredDate.nToNth(this.week)+" week of Easter";

    if(SacredDate.fallsOn(this.easter, today, this.gregorian.year))
    {
      result = "The Feast of the Resurrection";
    }
    else if(SacredDate.fallsOn(this.ascension, today, this.gregorian.year))
    {
      result = "The Feast of the Ascension";
    }
    else if(SacredDate.fallsOn(this.pentecost, today, this.gregorian.year))
    {
      result = "The Feast of Pentecost";
    }

    return(result);
  }

  buildColour()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var result = "white";

    if(SacredDate.fallsOn(this.pentecost, today, this.gregorian.year))
    {
      result = "red";
    }

    return(result);
  }
}

// Handles the data specific to the period of Ordinary Time after the
// season of Pentecost.
class AfterPentecost
{
  constructor(gregorian, pentecost)
  {
    this.gregorian = gregorian;
    this.pentecost = pentecost;
    this.week = this.buildWeek();
    this.dateString = this.buildDateString();
    this.colour = "green";
  }

  buildWeek()
  {
    var today = [this.gregorian.day, this.gregorian.month];
    var result = SacredDate.daysAfter(this.pentecost, today,
                                      this.gregorian.year);

    result = result-(result%daysInAWeek);
    result = result/daysInAWeek;
    result = result+1;

    return(result);
  }

  buildDateString()
  {
    var result = this.gregorian.weekday+" of the "+
                 SacredDate.nToNth(this.week)+" week after Pentecost";

    return(result);
  }
}

// Helper functions.
function packMonarchCode(code)
{
  var result;

  if(code === "T")
  {
    result = "<span class=\"frak\">T</span>";
  }
  else result = "X";

  return result;
}
function gitHubGetEaster(year)
{
  var f = Math.floor;
  var result;

  G = year%19,
  C = f(year/100),
  H = (C-f(C/4)-f((8*C+13)/25)+19*G+15)%30,
  I = H-f(H/28)*(1-f(29/(H+1))*f((21-G)/11)),
  J = (year+f(year/4)+I+2-C+f(C/4))%7,
  L = I-J,
  month = 3+f((L+40)/44),
  day = L+28-31*f(month/4);
  result = [day, month-1];

  return result;
}
function sakamotoGetWeekday(y, m, d)
{
  var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  var result;

  if(m < 3) y = y-1;
  result = (y +(y/4)-(y/100)+(y/400)+t[m-1]+d)%7;
  result = Math.floor(result);

  return result;
}

// Exports.
module.exports = Timings;
