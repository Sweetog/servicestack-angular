import { Injectable } from '@angular/core';
import { TimeFormats } from './const/timeformats.const'
import * as moment from 'moment-timezone';

@Injectable()
export class TimeService {

    /**
     * Gets the day number
     * @param utc 
     */
    public getDay(utc){
        var m = this.createTheMoment(utc);
        return m.day();
    }

    /**
     * Gets the day name from the day number
     * @param day 
     */
    public getDayNameFromDayNumber(day){
        return moment().day(day).format('dddd');
    }

    /**
     * Gets the month number
     * @param utc 
     */
    public getMonth(utc){
        var m = this.createTheMoment(utc);
        return m.month();
    }

    /**
     * Gets the month name from a month number
     * @param month 
     */
    public getMonthNameFromMonthNumber(month){
        return moment().month(month).format('MMMM');
    }
    /**
     * Returns Month Name of the date
     * @param utc 
     */
    public getMonthName(utc){
        var m = this.createTheMoment(utc);
        return m.format('MMMM');
    }

    /**
     * Get the local timezone of the browser.
     */
    public getLocalTimeZone(): string {
        return String(moment.tz.guess());
    }

    /**
     * Returns a localized ISO 8601 date string
     * @method utcToLocal
     * @param  {string} utc (ISO 8601)
     * @return {string} (ISO 8601)
     */
    public getCurrentDateTime = function(timeZone){
        var m = moment();

        if (timeZone) {
            m = moment.parseZone(m.tz(timeZone).format());
        } 

        return m.format();
    }

    /**
     * Tests if the provided string argument is a valid date or not
     * @param {string} date
     * @return {bool}
     */
    public isValidDate = function (date) {
        var m = this.createTheMoment(date);
        return m.isValid();
    }

    /**
     * Takes a string, ensures it is a valid date and a returns a squeaky clean ISO 8601
     * @param {string} s
     * @returns {string} (ISO 8601 or null if invalid date)
     */
    public scrubDate = function (s) {
        var m = this.createTheMoment(s);

        if (!m.isValid()) {
            return null;
        }

        return m.format();
    }

    /**
     * Gets a formated string from a utc based on the format you pass as an argument
     * UTC time will be returned localized if time zone provided
     * Inject "TimeFormats" constant into your component to help you with formats you can use
     * @method getFormat
     * @param  {string} utc (ISO 8601)
     * @param  {string} format
     * @param  {string} timeZone (optional)
     * @return {string}
     */
    public getFormat = function (utc, format, timeZone) {
        var m = this.createTheMoment(utc, timeZone);

        return m.format(format);
    }

    /**
     * Returns a localized ISO 8601 date string
     * @method utcToLocal
     * @param  {string} utc (ISO 8601)
     * @return {string} (ISO 8601)
     */
    public utcToLocal = function (utc, timeZone) {
        return this.getFormat(utc, null, timeZone);
    }

    /**
     * Gets the utc time part separated into {meridiem, hours, minutes} properties
     * timeObject will be localized if timeZone provided
     * @method getTimeObject
     * @param  {string} utc (ISO 8601)
     * @param  {bool} isMilitary
     * @param  {string} timeZone (optional)
     * @return {Object} {meridiem, hours, minutes}
     */
    public getTimeObject = function (utc, isMilitary, timeZone) {
        var m = this.createTheMoment(utc, timeZone);

        return this.getTimeObjectFromMoment(m, isMilitary);
    }

    /**
     * Gets a formated date part string from a utc
     * will be localized if time zone provided
     * defaults to 'MM/DD/YYYY'
     * @method getDefaultDateTimeFormat
     * @param  {string} utc (ISO 8601)
     * @param  {string} timeZone (optional)
     * @return {string}
     */
    public getDefaultDateTimeFormat = function (utc, timeZone) {
        return this.getFormat(utc, TimeFormats.defaultDateTime, timeZone);
    }

    /**
     * Gets a formated date part string from a utc
     * will be localized if time zone provided
     * defaults to 'MM/DD/YYYY'
     * @method getDefaultDateFormat
     * @param  {string} utc (ISO 8601)
     * @param  {string} timeZone (optional)
     * @return {string}
     */
    public getDefaultDateFormat = function (utc, timeZone) {
        return this.getFormat(utc, TimeFormats.defaultDate, timeZone);
    }

    /**
     * Gets a formated time part string from a utc
     * will be localized if time zone provided
     * defaults to 'hh:mm:ss a'
     * @method getDefautTimeFormat
     * @param  {string} utc (ISO 8601)
     * @param  {string} timeZone (optional)
     * @return {string}
     */
    public getDefautTimeFormat = function (utc, timeZone) {
        return this.getFormat(utc, TimeFormats.defaultTime, timeZone);
    }

    /**
    * Sets hours on a utc date.
    * The return will be localized if time zone provided.
    * @method hourSet
    * @param  {string} utc (ISO 8601)
    * @param  {Number} hours (or string)
    * @param  {string} timeZone (optional)
    * @return {string} (ISO 8601)
    */
    public hourSet = function (utc, hours, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var h = parseInt(hours, 10);

        return m.hour(h).format();
    }

    /**
    * Add hours on a utc date, pass in negative hours to substract.
    * The return will be localized if time zone provided.
    * @method hourAdd
    * @param  {string} utc (ISO 8601)
    * @param  {Number} hours (or string)
    * @param  {string} timeZone (optional)
    * @return {string} (ISO 8601)
    */
    public hourAdd = function (utc, hours, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var h = parseInt(hours, 10);

        return m.add(h, 'hours').format();
    }

    /**
    * Sets minutes on a utc date.
    * The return will be localized if time zone provided.
    * @method minuteSet
    * @param  {string} utc (ISO 8601)
    * @param  {Number} minutes (or string)
    * @param  {string} timeZone (optional)
    * @return {string} (ISO 8601)
    */
    public minuteSet = function (utc, minutes, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var min = parseInt(minutes, 10);

        return m.minute(min).format();
    }

    /**
     * Sets seconds on a utc date.
     * The return will be localized if time zone provided.
     * @method secondSet
     * @param  {string} utc (ISO 8601)
     * @param  {Number} seconds (or string)
     * @param  {string} timeZone (optional)
     * @return {string} (ISO 8601)
     */
    public secondSet = function (utc, seconds, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var s = parseInt(seconds, 10);

        return m.second(s).format();
    }


    /**
     * Add minutes on a utc date, pass in negative minutes to substract.
     * The return will be localized if time zone provided.
     * @method minuteAdd
     * @param  {string} utc (ISO 8601)
     * @param  {Number} minutes (or string)
     * @param  {string} timeZone (optional)
     * @return {string} (ISO 8601)
     */
    public minuteAdd = function (utc, minutes, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var min = parseInt(minutes, 10);

        return m.add(min, 'minutes').format();
    }

    /**
    * Adds days on a utc date, pass in negative days to substract.
    * The return will be localized if time zone provided.
    * @method dayAdd
    * @param  {string} utc (ISO 8601)
    * @param  {Number} days (or string)
    * @param  {string} timeZone (optional)
    * @return {string} (ISO 8601)
    */
    public dayAdd = function (utc, days, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var d = parseInt(days, 10);

        return m.add(days, 'days').format();
    }


    /**
    * Takes the current UTC time and makes sure its time is 23:59:59
    * The return will be localized if time zone provided.
    * @method maxDay
    * @param  {string} utc (ISO 8601)
    * @param  {string} timeZone (optional)
    * @return {string} (ISO 8601)
    */
    public maxDay = function (utc, timeZone) {
        utc = this.hourSet(utc, 23, timeZone);
        utc = this.minuteSet(utc, 59, timeZone);
        return this.secondSet(utc, 59, timeZone);
    }

    /**
    * Checks if date1 date part day comes after date2 date part day
    * ignores time and is agnostic of time zone as long as you are providing
    * the expected ISO 8601 Date Strings
    * @method isDayAfter
    * @param  {string} date1 (ISO 8601)
    * @param  {string} date2 (ISO 8601)
    * @return {bool}
    */
    public isDayAfter = function (date1, date2) {
        return moment(date1).isAfter(date2, 'day');
    }

    /**
    * Checks if date1 date part day comes before date2 date part day
    * ignores time and is agnostic of time zone as long as you are providing
    * the expected ISO 8601 Date Strings
    * @method isDayBefore
    * @param  {string} date1 (ISO 8601)
    * @param  {string} date2 (ISO 8601)
    * @return {bool}
    */
    public isDayBefore = function (date1, date2) {
        return moment(date1).isBefore(date2, 'day');
    }

    /**
     * Tests if date1 date part day is same as date2 date part day
     * ignores time and is agnostic of time zone as long as you are providing
     * the expected ISO 8601 Date Strings
     * @param  {string} date1 (ISO 8601)
     * @param  {string} date2 (ISO 8601)
     * @return {bool}
     */
    public isSameDay = function (date1, date2) {
        return moment(date1).isSame(date2, 'day');
    }

    /**
     * Adds years on a utc date, pass in negative years to substract.
     * The return will be localized if time zone provided.
     * @method dayAdd
     * @param  {string} utc (ISO 8601)
     * @param  {Number} days (or string)
     * @param  {string} timeZone (optional)
     * @return {string} (ISO 8601)
     */
    public yearAdd = function (utc, years, timeZone) {
        var m = this.createTheMoment(utc, timeZone);
        var d = parseInt(years, 10);

        return m.add(years, 'years').format();
    }


    /**
     * Checks if date1 date part year comes before date2 date part year
     * ignores time and is agnostic of time zone as long as you are providing
     * the expected ISO 8601 Date Strings
     * @method isDayBefore
     * @param  {string} date1 (ISO 8601)
     * @param  {string} date2 (ISO 8601)
     * @return {bool}
     */
    public isYearBefore = function (date1, date2) {
        return moment(date1).isBefore(date2, 'year');
    }

    /**
     * Get the duration difference between date1 and date2
     * ignores time and is agnostic of time zone as long as you are providing
     * the expected ISO 8601 Date Strings
     * @param  {string} date1 (ISO 8601)
     * @param  {string} date2 (ISO 8601)
     * @return {Number}
     */
    public getDuration = function (date1, date2) {
        if (!date1 || !date2) {
            return 0;
        }

        var startTime = moment(date1);
        var endTime = moment(date2);
        return endTime.diff(startTime);
    }

    /**
     * Gets the current utc date and time in
     * @return {string} (ISO 8601)
     */
    public now = function () {
        return moment().utc().format();
    }


    public dateAddDuration = function (date, duration) {
        var m = this.createTheMoment(date);
        return m.add(duration).format();
    }

    /**
     * ----------------------------------------
     * Private helper functions
     * ----------------------------------------
     */

    /**
     * Handles creating the timeObject based on a moment
     * @method getTimeObjectFromMoment
     * @return {Object} {meridiem, hours, minutes}
     */
    private getTimeObjectFromMoment(moment, isMilitary) {
        var hm = {}
        hm['meridiem'] = moment.format('A');
        hm['hours'] = isMilitary ? moment.format('HH') : moment.format('hh');
        hm['minutes'] = moment.format('mm');

        return hm;
    }

    /**
    * Common functionatility for creating a new Moment
    * @method this.createTheMoment
    * @param  {string} utc (ISO 8601)
    * @param  {string} timeZone (optional)
    * @return {Moment}
    */
    private createTheMoment(utc, timeZone = null) {
        var m = moment.utc(utc);

        if (timeZone) {
            m = moment.parseZone(m.tz(timeZone).format());
        }

        return m;
    }

    /**
     * 
     * @param dateString  (ISO 8601)
    */
    public getTimeFromDateString(dateString:string):string{
        let date = moment(dateString);
        return date.format('h:mm');
    }


    /**
     * 
     * @param dateString  (ISO 8601)
    */
    public getDateFromDateString(dateString:string):string{
        let date = moment(dateString);
        return date.format('MM-DD-YY');
    }

}