declare global {
  interface Date{
    GetDateWithoutTime(): this;
  }
}

Date.prototype.GetDateWithoutTime = function () {
  let offset = this.getTimezoneOffset()*60000;
  let newDate = new Date(this);
  newDate.setTime(newDate.getTime()-offset);
  return newDate;
};

export {};
