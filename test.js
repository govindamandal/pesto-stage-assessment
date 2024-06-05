const list = [
  {
    contentId: "666091b9f9044f7454883b3e",
    contentType: "Movie",
    _id: "66609bd09287f8a593b7c690",
  },
  {
    contentId: "666091b9f9044f7454883b3e",
    contentType: "Movie",
    _id: "66609e60136782cf25bff1ee",
  },
  {
    contentId: "66609036f9044f7454883b1c",
    contentType: "TVShow",
    _id: "66609e83136782cf25bff1f5",
  },
];

const contentId = '66609036f9044f7454883b1c';

const existing = list.some(item => item.contentId === contentId);

console.log('existing ', existing);
