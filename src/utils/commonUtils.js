export function compare(property1, property2, property3, property4 ){
  return (object1, object2)=> {
    const value1=object1[property1];
    const value2=object2[property1];
    if(value2 < value1){
      return 1;
    }else if(value2 > value1){
      return -1;
    }else {
      const value3=object1[property2];
      const value4=object2[property2];
      if(value4 < value3){
        return 1;
      }else if(value4 > value3){
        return -1;
      }else {
        const value5=object1[property3];
        const value6=object2[property3];
        if(value6 < value5){
          return 1;
        }else if(value6 > value5){
          return -1;
        }else {
          const value7=object1[property4];
          const value8=object2[property4];
          if(value8 < value7){
            return 1;
          }else if(value8 > value7){
            return -1;
          }else {
            return 0;
          }
        }
      }
    }
  };
}
