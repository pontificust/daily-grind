const updateAthleteWeight = (athlete, newWeight) => {
  const athleteNewVersion = JSON.parse(JSON.stringify(athlete));
  athleteNewVersion.stats.weight = newWeight;
  return athleteNewVersion;
};

const gymInventory = [];

// const addEquipment = (id, name, weight, count) => {
//   let buff = 0;
//   gymInventory.forEach((val) => {
//     if(val.id === id) {
//       val.count += count;
//     } else {
//       buff += 1;
//     }
//   });
//   if(buff === gymInventory.length){
//     gymInventory.push({id, name, weight, count});
//   }
// };

const addEquipment = (id, name, weight, count) => {
  const equipment = gymInventory.find((val) => val.id === id);
  if(equipment){
    equipment.count += count;
  } else {
    gymInventory.push({id, name, weight, count});
  }
}

const calculateTotalWeight = () => {
return gymInventory.reduce((acc, val) => acc + val.weight * val.count, 0);
}

const findHeavyItems = (minWeight) => {
  return gymInventory.filter((val) => val.weight > minWeight);
}

const robTheGym = (maxCapacity) => {
  const sortedInventory = JSON.parse(JSON.stringify(gymInventory));
  let robbedMass = 0;
  sortedInventory.sort((a, b) => b.weight - a.weight);
  console.table(sortedInventory);
  for(let i = 0; i < sortedInventory.length; i += 1){
    const newWeight = sortedInventory[i].weight;
    if(robbedMass + newWeight === maxCapacity){
      return robbedMass + newWeight;
    } else if(robbedMass + newWeight > maxCapacity){
      continue;
    }
    let count = 0;
    while(robbedMass + newWeight <= maxCapacity && count !== sortedInventory[i].count){
      robbedMass += newWeight;
      count += 1;
    }
  }
  return robbedMass;
}

addEquipment(1, "barbell", 20, 2);
addEquipment(2, "dumbbells", 10, 2);
addEquipment(3, "dumbbells", 8, 2);
addEquipment(4, "dumbbells", 6, 2);
addEquipment(5, "dumbbells", 4, 2);
addEquipment(6, "dumbbellPancakes", 15, 1);
console.log(robTheGym(60));
console.table(findHeavyItems(10));
console.log(calculateTotalWeight());

const athleteProfile = {
  name: "John",
  age: 22,
  stats: {
    weight: 63,
    height: 178, 
  },
};

console.table(updateAthleteWeight(athleteProfile, 64));
console.table(athleteProfile);


