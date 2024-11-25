const getGroups = (elements: any[], elementsPerGroup: number = 4) => {
  let groups: [any[]] = [[]];

  let index: number = 0;
  let count: number = 0;

  for (let i = 0; i < elements.length; i++) {
    groups[index].push(elements[i]);
    ++count;

    if (count !== elementsPerGroup) continue;
    if (i !== elements.length - 1) groups.push([]);
    
    count = 0;
    ++index;
  }

  return groups;
};

export default getGroups;
