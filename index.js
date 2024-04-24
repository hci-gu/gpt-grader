import dotenv from 'dotenv'
dotenv.config()
import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import {
  exampleMessages,
  exampleMessagesGradingInstruction,
  getGradeInstruction,
  gradingInstructionSWE,
  gradingInstructionSWEShorter,
} from './prompt.js'
import { getClient } from './lib/client.js'

// function saveStats() {
//   const intentReqs = requests.filter((s) => s.type === 'intent')
//   const averageDurationIntent =
//     intentReqs.reduce((acc, curr) => acc + curr.duration, 0) / intentReqs.length
//   const gradeReqs = requests.filter((s) => s.type === 'grade')
//   const averageDurationGrade =
//     gradeReqs.reduce((acc, curr) => acc + curr.duration, 0) / gradeReqs.length
//   fs.writeFileSync(
//     'stats.json',
//     JSON.stringify(
//       {
//         requests,
//         averageDurationIntent,
//         averageDurationGrade,
//       },
//       null,
//       2
//     )
//   )
// }

// let runs = 0
// let requests = []

const getBetterText = async (text1, text2) => {
  let start = new Date()
  const { getCompletion } = getClient('local')

  const systemPrompt = `
    You are a teacher grading a student's writing assignment. Messages you receive will contain two texts, your job is to say which of the texts is better."

    The following are your instructions for grading the student's writing assignment:
    ${gradingInstructionSWEShorter}
    `
  const userPrompt = `
    Text1: ${text1}
    
    Text2: ${text2}

    Which text is better?
    `
  const response = await getCompletion(systemPrompt, userPrompt)
  fs.writeFileSync(
    `./data/run_${runs}_grade.json`,
    JSON.stringify(response, null, 2)
  )

  const durationInSeconds = (new Date() - start) / 1000
  requests.push({
    type: 'grade',
    usage: response.usage,
    duration: durationInSeconds,
  })
  saveStats()

  return getIntentOfMessage(response.choices[0].message.content)
}

const createUser = ({ text, grades }) => ({
  id: uuid(),
  rating: 1500,
  text,
  grades,
  wins: 0,
  losses: 0,
})

async function main() {
  const users = [
    createUser({
      text: `Title: People Should Eat More Vegetarian Food At this time it is beoming abundantly clear that climate change is a fact and that human behavior plays a huge role in it. As our population increases and technological development occurs all across the globe, the need to find more sustainables ways to live becomes ever more important. A large part of our greenhouse gasemissions come from agriculture and while we won´t be able to eliminate all of it we can at least be mor efficient with the land and energy used. Farm animals need food and they use more calories than they provide. They also need a lot of space, especially if you want them to live better lives. This means we need to grow even more wheat, maize and barley in order to feed all the animals to sustain our growing population. In turn, this means we need to use even more land for agriculture. Often, this leads to de-forestation which further reduces our planets ability to manage the increase in greenhouse gasses. Along with that, our reduction of forested areas often mean less space for wildlife. In places where you have larger predators, this ca lead to conflicts between farmers and wildlife when predators choose to go after livestack when they no longer have their natural hunting grounds. Convincing people to change their habits will always be hard, especially when it can be hard to show the connection between the meat that we eat and global warming. We will also need to make sure that people whose livelihoods depend on meat production have an out. Perhaps through subsidies for other food production or re-education. I don´t have high hopes that enough people can be convinced to change their food habits very quickly but perhaps if something like lab grown meat becomes a reality and widespread then people might not have to. Either way, I believe that either we change our ways voluntarily or we become forced to A growing population, more scarce drinkable water, less farmable land due to increasing temperatures. Something has to give. `,
      grades: [5, 5],
    }),
    createUser({
      text: `TITLE: What people eat is up to them I think every human can choise what they gonna eat, noone can say to me you can´t eat that or that. But it´s good to think what we eat. Exempel today we eat more meat then we need to so it´s a good idé to start thinking to eat more vegitabels but it´s up to me in person to deside that and no one else. The same thing about candy, today it´s a big problem that people is going to get bigger and bigger and it not good. It´s not healty to have over wight on the body. This is a lite bit hard because I choise to eat candy whenever I want but the doctor or family member or someone of my friends can tell me you should not and can help me so Idon´t eat candy whenever I wont. Buf it upp to me to deside if i want the help or not. People should think one step longer what they put in the mouth. In the future we gonna have problems I think with food. We buy a lot´s of food and we put a lot of food in the trash and it not good for our planet. We can´t be so ego and only think it´s about me. The world can´t take that we use so musch food and if we are overweight it´s not only me it gonna be a problem for. It coast a lot of money from the state to help a overwight human and then we need to pay more tax so the hospital can get more money. It´s a bit extream though but maybe. I think we need to change peopels thoughs about food, only you can deside what you eat but depends of what you eat the future can see diffecult out. I say that I say before you are not alone in the world and all of us must help together so we can be more healty in ours body and so we can do good for the planet.`,
      grades: [2, 1],
    }),
    createUser({
      text: `TITLE: 3. People Should Eat More Vegetarian Food Vegetarian m has too long been associated as a choice of diet associated with Buddhism and the staple foods of the monks and nuns in monasteries. However along with economic prosperity and advantage of international trades, more peoples have easier access to large variant of food choices in developed countries. Due to this, becoming a vegetarian becomes a viable choice for one who chooses to adopt and sees the positive values beyond vegetarianism. One of the biggest issues globally today is climate change. According to latest scientific reports published by the UNEP, we´re living in a time whereby reversing climate change is no longer a possibility other than to simply slowing down global warming cause by greenhouse gases. This big problem is a result of long term imbalances of cultural vs biological revolution due to overfarming in food production in order to supply a fast growing meat-focused world population. As a consequent to this, it lead to biodiversities collapses.`,
      grades: [3, 4],
    }),
    createUser({
      text: `TITLE: What people eat is up to Them It is important that people eat whatever they wont to eat. In today world that is easyer set then done. We all have to consider how the food has ben prduced, where is coming from, all the parts that are involved. When you want to eat an exotic fruit, say that you have good economy, you can buy anny fruit youe want, bat if is coming from an. ex. South Amerika or New Zealand, youe shodd think twice before youe bauy it. I am thinking on climatechange and polution, bat at that same time we are all people. I think the most of us buy that Kiwi from New Zealand if we have the money to buy it. It looks like we forget easy all the parts that are significaut when we talking about food production and where is coming from. I believe that is passible that we can produce more local food in general, and we must reduce import att least from other continents. More people shood cook they own food, and eat way less processed food. I dont believe that is a hole answer or that is the solution, bat it could be the first stepp in the right direcktion. We have to support each other.`,
      grades: [2, 2],
    }),
    createUser({
      text: `TITLE: People Should eat more vegetarian food It is good for the Planet to eat green. And if you start eating more vegetariant you will very soon feel more healty. It is also good for the animals.`,
      grades: [0, 1],
    }),
    createUser({
      text: `TITLE: Religion is a personal choice Swedish people pride themselves in being a liberal country where you have freedom to choose your own religion. For the most part I agree that Swedes respects and honor that idea. However, the social structure in Sweden is not as liberal as many might think. Pressure from family and friends is still a real issue. I´ve always found it very interesting how location in our world plays such a huge role in what religion we believe in. The vaste majority of native Swedes follows the beliefs of Christianity. I greatly believe that religion is a personal choice and I believe most Swedes would agree with me. But why is then Christianity such a big majority in Sweden? For one I believe that our traditions in Sweden should change. If I go to the store in Sweden to buy groceries in the month of December, there is a high probability that the store is decorated in a Christmas theme. That is not the case during Ramadan or other holidays from other religions. Swedish schools spend more hours studying Christianity than other religions. I strongly believe that Sweden and other countries should start celebrating many different holidays from different religions to promote freedom of religion. Until that happens, I sadly believe that we won´t see a big change in personal choice. It´s personal choice in disguise as it stands right now.`,
      grades: [4, 5],
    }),
    createUser({
      text: `TITLE: People Should Eat More Vegetarian Food The issues surrounding Global warming and climate change are becoming more aparent as it´s effects have begone to menifest around us. Temperature levels have risen to an all time high causing devistation across countries. Increased frequencies of forest fires followed with drout disrupting food production, alongside alarmingly low levels of water in major rivers such as the Rein disrupting shipments. These issues have become more prevelent and drastic changes are being implemented to ease the situation. One of the most prevelent solutions is the electrification of our transport. Although these changes are overall great there are still areas that have somewhat been "forgoten" in one way or another. Studies have shown how big a part livestock agriculture has on emissions, methane being one of the biggest contributors to this. not only do we have to think of reducing our carbon footprint by changing our mode of transport. we also have to think of our food consumption. Reducing the overall "need" for meat and showing future generations a better and healthier diet. Currently there´s still a big misconception around eating more "vegetarian" foods as its either associated to extreme groups who save animals or that it dosen´t contain enough protein. Proper steps need to be taken to teach the population a more balanced diet. You don´t have to eat meat every day. Have vegetarian food every now and then to ease into the change. It dosen´t have to be that or the other. `,
      grades: [5, 5],
    }),
    createUser({
      text: `TITLE: People should eat more Vegetarian Food Al around the world the vegetarian Foods or diet has been more and more popular In diffrent countries and parts the vegan or vegetarian foods is the main categorite of the meal. But even if modern vegetarian foods maybe pricier these days that have not always been te case. Nowadays the price of vegetarian Foods has risin by the cause of popularite and influenced by famous and rich people. For exempel A Kylie Jenner Avocadotoast is more seen like a fine dining meal then the Swedish tradition like Toast Skagen wich is a mayonaisebase dish whit shrimp placed on a rosted whithe bread. The benifits of a more vegetarian diet is proven to be better for the planet But if we look back in time arounde the 1930´s the population had more exsess to milk, eggs, cheese and the "waste" products from the animals. When the wold war started people could just not afford meats and taking care of the animals was the main thing for a family to survive the hard times that when the dishes like kalesoup with dough was someting many Swedish families had on theire dinner tables the soup speaks for it self but the dough "lump" the put in was made from weatflower and butter from the cow or animat fat. In hard times pepole always found a way to and had to adapt to what they had. In the low socaities the main course could have been boiled potatoes and Lingonberry. The cons of this were that poor families was un nuriched. I think that what we know today about nutritions and healty foods we are more than capable to take care of what the planet has to offer to us. We can grow our own foods, and crafts and be more independent. Not to relai on imported food and substetuite meats from soya beans or qourn but take cae from what this country has to offer and can give us. By localy made food like eggs & milk grow your own potatoes, peas, carrots and buy food that has a low inpact on the planet. If we trusted more on our farmers then this country would not have to import and ship over seas for food that we already posest. The source from this is from a long generation of farmers in my family and living in a comunity were we charies the land. Without the Vegetarian food we will not survive.`,
      grades: [3, 3],
    }),
    createUser({
      text: `TITLE: People should more vegetarian food I think now i world, we dont hav so many food. vi most think that we want to eat. we most thinke we want to eat. we most think about our world we liv. what hapend i future when we use then like we use? when we eat food, they came from animals for exampel chicke or ko, they are live not allways. Maby one day we don´t have them they came finnsh and we don´t have mor beef. So it is much better we think about this. And we can think about this at beef and chicken much expensiv, but not vegetarian food. Så many people think at vegetarin food don´t have protein, and we need protein. I want to say at we have vegetan, they have protein, sa they don´t think about this. when we eat vegetarin food it´s much better for helth. people i world came more and more. vi have to think to our child and child child. It´s came diffcalt for them i futuer. It´s impertant att what we eat for food. what vi can to think about this we want to eat? we most think to diffrind chees at what we can eat? They are tree posstiv when we eat vegetarian food, first it´s been not expensiv secend, they cam to finsh animals food and third it is a good for health. so lets do it and stard eat vegetarian food.`,
      grades: [1, 1],
    }),
    createUser({
      text: `TITLE: Religion is more than a personal choice Religion creates both difficulties and possibilities for human beings, involves conflicts between people, it was, it is and it will be an important issue in the world. Religion could be important for a family, an individ, a country or a nation. Beliving in one god or another involve consequences in most of the countries of the world. That is why, in my opinion religion is more than a personal choice. First of all, in some families are both parents very religious and try to influence their children to have the same religion. In those parents eyes it is a sin to abanndone the tradition and religion, somethimes they break the contact with their children when children try to find their own way in life by choosing their future husband/wife, carrier or religion. When parents chose a strict religion it was not only their personal choice, it influenced even their children because the religion itself does not allow other family members to choose without starting a conflict. Secondly, in the western contries, are people free to choose how they want live their lives and they can even choose their own god to belive in. In Sweden and other countries in Scandinavia choose though people to think that there is no god and after death there is nothing more. This is more than a personal choice as well because thinking that there is no god, make people wanting to judge and critisize those who belive in a higher force. It creates differences between people and this does not bring people closer but separates people between "we" and "them" which is always dangerous for the democraty. In the end, I think that choosing a religion or another should be free but it is far from personal because it is so controversial, really sensitive discussion topic, and people get angry really easy only thinking about religion. Religion looses a bit of importance in west but is still strong in east. The future may change how people look at religion but it may take one thousand years.`,
      grades: [3, 4],
    }),
    createUser({
      text: `TITLE: What people eat is up to them We are fasing a global climate change. The green-house gases in the athmosphere is rising every year. Severall studies show that what we eat do have a massive impact on our enviorment. Animal agriculture produces alot of green-house gases, much more than vegetable production. One simple solution is to ban all meat. Annother solution is to have additional tax on products that contians meat. The problem with the mentioned solutions is that they probably won´t be popular among people. If you want real change people have to make their own mind in what´s best for them. An effective way to change the way we think is facts. Inform on the benefits of vegetarian food. Inform about the benefits regarding the enviorment, our health benefits, knowlege is the key, with large campaigns you can create big awarness among people. And what does people do? they talk! when people talk the awarness grows, and the wheel starts turning. I think that if you look back 50 years and compare how we talk about food today you will see that people are quite counsious today about what they eat and wy. this will continue into the future and hepefully it will make us eat even better than today. Force is not the key. Information is.`,
      grades: [2, 2],
    }),
    createUser({
      text: `TITLE: What people eat is up to them We are fasing a global climate change. The green-house gases in the athmosphere is rising every year. Severall studies show that what we eat do have a massive impact on our enviorment. Animal agriculture produces alot of green-house gases, much more than vegetable production. One simple solution is to ban all meat. Annother solution is to have additional tax on products that contians meat. The problem with the mentioned solutions is that they probably won´t be popular among people. If you want real change people have to make their own mind in what´s best for them. An effective way to change the way we think is facts. Inform on the benefits of vegetarian food. Inform about the benefits regarding the enviorment, our health benefits, knowlege is the key, with large campaigns you can create big awarness among people. And what does people do? they talk! when people talk the awarness grows, and the wheel starts turning. I think that if you look back 50 years and compare how we talk about food today you will see that people are quite counsious today about what they eat and wy. this will continue into the future and hepefully it will make us eat even better than today. Force is not the key. Information is.`,
      grades: [4, 4],
    }),
  ]

  users.sort(() => Math.random() - 0.5)
  let start = new Date()
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2))

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i]
      const user2 = users[j]
      const text1Won = await getBetterText(user1.text, user2.text)
      runs++
      const winner = text1Won ? user1 : user2
      const loser = text1Won ? user2 : user1
      const [winnerNewElo, loserNewElo] = calculateElo(winner.elo, loser.elo)
      winner.elo = winnerNewElo
      loser.elo = loserNewElo
      winner.wins++
      loser.losses++
      fs.writeFileSync('users.json', JSON.stringify(users, null, 2))
    }
  }

  console.log('end run')
  console.log('number of matchups:', runs)
  console.log('time taken:', new Date() - start)
}

main()
