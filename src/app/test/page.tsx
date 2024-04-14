import { createPostDumy } from "@/lib/seed";

interface Post {
  category: {
    id: number;
    name: string;
  }[];

  title: string;
  content: string;
  authorId: number | null;
  authorName: string | null;
}

const dummyPosts3: Post[] = [
  {
    category: [
      { id: 9, name: "Travel" },
      { id: 10, name: "Adventure" },
    ],

    title: "Exploring the Wonders of Machu Picchu",
    content:
      "Machu Picchu is one of the most iconic archaeological sites in the world, located high in the Andes Mountains of Peru. Built by the Inca civilization in the 15th century, this ancient citadel is renowned for its breathtaking architecture, stunning panoramic views, and rich cultural history. This post takes you on a journey to explore the wonders of Machu Picchu and discover the secrets of this ancient wonder.\n\nPerched atop a rugged mountain ridge overlooking the Urubamba River valley, Machu Picchu is a testament to the ingenuity and engineering prowess of the Inca people. The site is divided into two main areas: the agricultural sector, which consists of terraced fields and agricultural terraces used for farming, and the urban sector, which includes temples, palaces, and residential areas.\n\nOne of the most impressive features of Machu Picchu is its finely crafted stone structures, built without the use of mortar. The precision and craftsmanship of the Inca stonemasons are evident in the intricate carvings, smooth surfaces, and precise angles of the buildings. The Temple of the Sun, the Intihuatana stone, and the Temple of the Condor are just a few examples of the remarkable architectural feats found within the citadel.\n\nIn addition to its architectural wonders, Machu Picchu is also renowned for its natural beauty and biodiversity. The site is surrounded by lush cloud forests teeming with a diverse array of plant and animal species, including orchids, hummingbirds, and spectacled bears. Visitors to Machu Picchu can explore the scenic hiking trails that wind through the mountains, offering stunning views of the surrounding landscape.\n\nMachu Picchu holds immense cultural significance for the people of Peru and the world at large. In 1983, it was designated a UNESCO World Heritage Site in recognition of its outstanding universal value and contribution to humanity's cultural heritage. Today, Machu Picchu attracts millions of visitors from around the globe who come to marvel at its beauty, learn about its history, and experience the magic of this ancient wonder.",
    authorId: 4,
    authorName: "JohnDoe",
  },
  {
    category: [
      { id: 11, name: "Food" },
      { id: 12, name: "Cooking" },
    ],

    title: "The Art of French Cuisine: A Culinary Journey",
    content:
      "French cuisine is renowned worldwide for its elegance, sophistication, and rich culinary tradition. From decadent pastries and creamy cheeses to hearty stews and delicate sauces, French cuisine offers a diverse range of flavors and textures that tantalize the taste buds and delight the senses. This post invites you on a culinary journey to explore the art of French cuisine and discover the secrets of its timeless appeal.\n\nAt the heart of French cuisine is a deep respect for quality ingredients and traditional cooking techniques. French chefs take pride in sourcing the freshest produce, meats, and seafood from local markets and farms, ensuring that each dish is bursting with flavor and freshness. From the vineyards of Bordeaux to the lavender fields of Provence, France's diverse landscape provides an abundance of ingredients that inspire creativity and innovation in the kitchen.\n\nOne of the hallmarks of French cuisine is its emphasis on balance and harmony in flavors and textures. Classic French dishes, such as coq au vin, boeuf bourguignon, and ratatouille, are characterized by their rich, complex flavors and meticulous attention to detail. Whether it's the subtle sweetness of caramelized onions, the velvety richness of a well-reduced sauce, or the delicate crunch of a perfectly baked baguette, every element of a French meal is carefully crafted to create a symphony of taste and texture.\n\nFrench cuisine is also renowned for its commitment to culinary traditions and techniques passed down through generations. From the art of pastry making to the mastery of sauce making, French chefs undergo rigorous training to hone their skills and uphold the standards of excellence that define French gastronomy. Whether you're enjoying a simple baguette with butter and jam or savoring a multi-course tasting menu at a Michelin-starred restaurant, every meal in France is an opportunity to experience the beauty and complexity of French cuisine.",
    authorId: 5,
    authorName: "JaneDoe",
  },
  // Add more dummy posts as needed
];

const dummyPosts1: Post[] = [
  {
    category: [
      { id: 5, name: "Health" },
      { id: 6, name: "Fitness" },
    ],

    title: "The Importance of Mental Health Awareness",
    content:
      "Mental health awareness is crucial for promoting well-being and reducing the stigma associated with mental illness. Despite growing recognition of the importance of mental health, many people still face barriers to accessing care and support. This post explores the significance of mental health awareness and the steps individuals and communities can take to promote mental well-being.\n\nOne of the key reasons why mental health awareness is essential is because mental illnesses are prevalent and can have a significant impact on individuals and society as a whole. According to the World Health Organization (WHO), depression is the leading cause of disability worldwide, affecting more than 264 million people. Other common mental health disorders, such as anxiety, bipolar disorder, and schizophrenia, also contribute to the global burden of disease.\n\nDespite the high prevalence of mental illness, there is still a lack of understanding and empathy towards those who experience these conditions. Stigma and discrimination can prevent people from seeking help and receiving the support they need to recover. By raising awareness about mental health and challenging misconceptions, we can create a more inclusive and supportive environment for individuals living with mental illness.\n\nIn addition to reducing stigma, mental health awareness can also help individuals recognize the signs and symptoms of mental illness in themselves and others. Early intervention is key to preventing the escalation of mental health problems and improving outcomes for those affected. By promoting awareness and education about mental health, we can empower people to seek help sooner and access appropriate treatment and support.\n\nFurthermore, mental health awareness is essential for fostering resilience and promoting positive mental well-being. In today's fast-paced and stressful world, many people struggle to cope with the demands of daily life. By promoting self-care practices and providing resources for managing stress and building resilience, we can help individuals protect their mental health and thrive in all aspects of their lives.\n\nUltimately, mental health awareness is not just about recognizing the presence of mental illness; it's about promoting a culture of empathy, understanding, and support for everyone's mental well-being. By working together to raise awareness and break down barriers, we can create a world where mental health is valued, protected, and prioritized for all.",
    authorId: 5,
    authorName: "JaneDoe",
  },
  {
    category: [
      { id: 7, name: "Education" },
      { id: 8, name: "Learning" },
    ],

    title: "The Benefits of Lifelong Learning",
    content:
      "Lifelong learning is the ongoing pursuit of knowledge and skills throughout one's life. In today's rapidly changing world, the need for lifelong learning has never been greater. This post explores the benefits of lifelong learning and how it can enrich our personal and professional lives.\n\nOne of the primary benefits of lifelong learning is personal development. Engaging in continuous learning allows individuals to explore new interests, expand their horizons, and discover new talents. Whether it's learning a new language, mastering a musical instrument, or exploring a new hobby, lifelong learning offers endless opportunities for personal growth and fulfillment.\n\nIn addition to personal development, lifelong learning also has numerous benefits for professional development. In today's knowledge-based economy, staying relevant and up-to-date with the latest skills and technologies is essential for career success. Lifelong learners are better equipped to adapt to changes in the job market, pursue new career opportunities, and remain competitive in their chosen fields.\n\nMoreover, lifelong learning can enhance cognitive function and brain health. Studies have shown that engaging in intellectually stimulating activities, such as learning new skills or solving puzzles, can help maintain cognitive function and reduce the risk of age-related cognitive decline. By challenging the mind and staying mentally active, lifelong learners can promote brain health and improve overall well-being.\n\nFurthermore, lifelong learning fosters a culture of curiosity, innovation, and creativity. By encouraging a mindset of continuous learning and exploration, individuals and organizations can drive innovation, solve complex problems, and create positive change in society. Lifelong learners are more likely to think critically, adapt to new situations, and generate creative solutions to challenges.\n\nIn conclusion, lifelong learning is not just a means to an end; it's a journey of personal and professional growth that enriches our lives in countless ways. By embracing a lifelong learning mindset and investing in our ongoing education, we can unlock our full potential, pursue our passions, and lead fulfilling lives.",
    authorId: 4,
    authorName: "JohnDoe",
  },
  // Add more dummy posts as needed
];
const dummyPosts2: Post[] = [
  {
    category: [
      { id: 5, name: "Health" },
      { id: 6, name: "Fitness" },
    ],

    title: "The Importance of Mental Health Awareness",
    content:
      "Mental health awareness is crucial for promoting well-being and reducing the stigma associated with mental illness. Despite growing recognition of the importance of mental health, many people still face barriers to accessing care and support. This post explores the significance of mental health awareness and the steps individuals and communities can take to promote mental well-being.\n\nOne of the key reasons why mental health awareness is essential is because mental illnesses are prevalent and can have a significant impact on individuals and society as a whole. According to the World Health Organization (WHO), depression is the leading cause of disability worldwide, affecting more than 264 million people. Other common mental health disorders, such as anxiety, bipolar disorder, and schizophrenia, also contribute to the global burden of disease.\n\nDespite the high prevalence of mental illness, there is still a lack of understanding and empathy towards those who experience these conditions. Stigma and discrimination can prevent people from seeking help and receiving the support they need to recover. By raising awareness about mental health and challenging misconceptions, we can create a more inclusive and supportive environment for individuals living with mental illness.\n\nIn addition to reducing stigma, mental health awareness can also help individuals recognize the signs and symptoms of mental illness in themselves and others. Early intervention is key to preventing the escalation of mental health problems and improving outcomes for those affected. By promoting awareness and education about mental health, we can empower people to seek help sooner and access appropriate treatment and support.\n\nFurthermore, mental health awareness is essential for fostering resilience and promoting positive mental well-being. In today's fast-paced and stressful world, many people struggle to cope with the demands of daily life. By promoting self-care practices and providing resources for managing stress and building resilience, we can help individuals protect their mental health and thrive in all aspects of their lives.\n\nUltimately, mental health awareness is not just about recognizing the presence of mental illness; it's about promoting a culture of empathy, understanding, and support for everyone's mental well-being. By working together to raise awareness and break down barriers, we can create a world where mental health is valued, protected, and prioritized for all.",
    authorId: 4,
    authorName: "JohnDoe",
  },
  {
    category: [
      { id: 7, name: "Education" },
      { id: 8, name: "Learning" },
    ],

    title: "The Benefits of Lifelong Learning",
    content:
      "Lifelong learning is the ongoing pursuit of knowledge and skills throughout one's life. In today's rapidly changing world, the need for lifelong learning has never been greater. This post explores the benefits of lifelong learning and how it can enrich our personal and professional lives.\n\nOne of the primary benefits of lifelong learning is personal development. Engaging in continuous learning allows individuals to explore new interests, expand their horizons, and discover new talents. Whether it's learning a new language, mastering a musical instrument, or exploring a new hobby, lifelong learning offers endless opportunities for personal growth and fulfillment.\n\nIn addition to personal development, lifelong learning also has numerous benefits for professional development. In today's knowledge-based economy, staying relevant and up-to-date with the latest skills and technologies is essential for career success. Lifelong learners are better equipped to adapt to changes in the job market, pursue new career opportunities, and remain competitive in their chosen fields.\n\nMoreover, lifelong learning can enhance cognitive function and brain health. Studies have shown that engaging in intellectually stimulating activities, such as learning new skills or solving puzzles, can help maintain cognitive function and reduce the risk of age-related cognitive decline. By challenging the mind and staying mentally active, lifelong learners can promote brain health and improve overall well-being.\n\nFurthermore, lifelong learning fosters a culture of curiosity, innovation, and creativity. By encouraging a mindset of continuous learning and exploration, individuals and organizations can drive innovation, solve complex problems, and create positive change in society. Lifelong learners are more likely to think critically, adapt to new situations, and generate creative solutions to challenges.\n\nIn conclusion, lifelong learning is not just a means to an end; it's a journey of personal and professional growth that enriches our lives in countless ways. By embracing a lifelong learning mindset and investing in our ongoing education, we can unlock our full potential, pursue our passions, and lead fulfilling lives.",
    authorId: 5,
    authorName: "JaneDoe",
  },
  // Add more dummy posts as needed
];

const dummyPosts: Post[] = [
  {
    category: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Science" },
    ],

    title: "The Future of Space Exploration",
    content:
      "Space exploration has always captured the imagination of humanity. From the early days of the space race to the modern era of private space companies, the quest to explore beyond Earth's atmosphere continues to evolve. In recent years, there has been renewed interest and investment in space exploration, driven by advances in technology and the desire to push the boundaries of human knowledge. This post delves into the current state of space exploration and speculates about what the future might hold for humanity's endeavors beyond our planet.\n\nSpace agencies around the world, such as NASA, ESA, and Roscosmos, are actively pursuing ambitious missions to explore the cosmos. From robotic probes sent to study distant planets and asteroids to crewed missions to the International Space Station (ISS), there is a wide range of activities underway in the realm of space exploration. One of the most significant developments in recent years has been the rise of private space companies like SpaceX, Blue Origin, and Virgin Galactic. These companies are revolutionizing the space industry by developing reusable rocket technology, reducing the cost of access to space, and paving the way for commercial space travel.\n\nIn addition to government agencies and private companies, international collaboration has become increasingly important in space exploration. Projects like the ISS, which involves participation from multiple countries, demonstrate the potential for cooperation in the pursuit of common goals. Collaborative efforts also extend to scientific research, with missions like the James Webb Space Telescope being developed through international partnerships.\n\nLooking ahead, the future of space exploration holds both challenges and opportunities. One of the key challenges is ensuring the sustainability of space activities while minimizing their impact on the space environment. Issues such as space debris, orbital congestion, and the preservation of celestial bodies will need to be addressed as space exploration continues to expand.\n\nAnother challenge is the long-term viability of crewed missions to destinations like Mars. While significant progress has been made in developing the necessary technology for interplanetary travel, there are still many hurdles to overcome, including the physiological and psychological effects of long-duration spaceflight.\n\nDespite these challenges, the future of space exploration is brimming with possibilities. Advances in propulsion technology, such as ion propulsion and nuclear thermal propulsion, could enable faster and more efficient travel throughout the solar system. Exploration of the outer planets, the asteroid belt, and beyond could uncover new insights into the origins of the universe and the potential for extraterrestrial life.\n\nMoreover, space exploration has the potential to inspire future generations and drive innovation in fields ranging from science and engineering to medicine and sustainability. By continuing to push the boundaries of what is possible in space, humanity can unlock new frontiers of knowledge and ensure a brighter future for our species.",

    authorId: 4,
    authorName: "JohnDoe",
  },
  {
    category: [
      { id: 3, name: "Politics" },
      { id: 4, name: "History" },
    ],

    title: "The Rise and Fall of Ancient Civilizations",
    content:
      "The history of humanity is marked by the rise and fall of civilizations. From ancient Mesopotamia and Egypt to the Roman Empire and beyond, civilizations have flourished and declined throughout the ages. Understanding the factors that contribute to the success or failure of societies is essential for gaining insights into our own present and future.\n\nOne of the key factors in the rise of ancient civilizations was geographic location. Civilizations that emerged in fertile river valleys, such as the Tigris and Euphrates in Mesopotamia and the Nile in Egypt, had access to abundant resources for agriculture and trade. This allowed them to develop complex societies with sophisticated political, economic, and cultural systems.\n\nAnother factor was technological innovation. Ancient civilizations made significant advances in areas such as agriculture, architecture, and warfare, which enabled them to expand their influence and control over vast territories. The invention of writing, for example, allowed for the recording and transmission of knowledge, facilitating the development of complex societies and centralized governments.\n\nHowever, the success of ancient civilizations was often fragile and short-lived. Factors such as environmental degradation, internal strife, and external invasion could lead to their downfall. For example, the collapse of the Roman Empire was precipitated by a combination of political instability, economic decline, and barbarian invasions.\n\nDespite their eventual decline, the legacy of ancient civilizations continues to influence the modern world. Many aspects of our society, from language and law to religion and architecture, can be traced back to the civilizations of the past. By studying the rise and fall of ancient civilizations, we can gain valuable insights into the complexities of human society and the challenges we face in the present day.\n\nIn conclusion, the rise and fall of ancient civilizations are a testament to the resilience and fragility of human societies. While they may have disappeared from the pages of history, their impact on the world lingers on, reminding us of the enduring legacy of the past.",
    authorId: 5,
    authorName: "JaneDoe",
  },
  // Add more dummy posts as neededs
];

export default async function page() {
  // const res = await createPostDumy(dummyPosts3[1]);
  // console.log(res);
  return <div></div>;
}
