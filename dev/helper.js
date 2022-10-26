function getRandomVal(min, max){
 
  let range = max-min

  let result = (Math.random()*range) + min 
  return result;
}


export { getRandomVal };