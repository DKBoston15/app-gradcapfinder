import React, { useEffect, useState } from "react";

export default function DailyAffirmation() {
  const [randomValue, setRandomValue] = useState("");
  const array = [
    "Dissertations are written 15 minutes/day and not 8 hrs/Saturday.",
    "Your work will change the world in ways you will never know",
    "Why haven’t you read your advisors dissertation. What do you think they think a dissertation should like?",
    "How PhDs does it take to write a dissertation? 4-5, one advisor to drive you nuts and 3-4 on a committee to confuse you even more.",
    "It takes a village to write a dissertation and a committee to verify",
    "Who are your 3-7 authors? Why aren’t you one of them?",
    "Never fail to say, “I don’t know” in a room full of smart people. The ones who agree with you are the ones you should get know.",
    "Use figures to express your ideas. This forces others to shut up and think before they speak.",
    "Your family love to hear you speak about your research and how much you know. ",
    "There are 7 billion other people in this world you will need to convince.",
    "Graduate schools are data rich but analysis poor. Most dissertations work the other way around.",
    "Completing a dissertation will take as long as it takes. Don’t let anyone tell you different.",
    "Yoda was write! Now do it!!",
    "You will always be your own worst critic. This does not mean you know what you are talking about. Let others help you finish your dissertation.",
    "Descartes was right! I fail, therefore I learn.",
    "Churchill was close. The graduate experience is a burden, wrapped in anxiety, inside self-doubt.",
    "If everyone else is worried about something, let them worry about it for you. Then, worry about something else.",
    "Everyday you do not think about your dissertation adds 3 days to your time in graduate limbo.",
    "Nobody cares how many pubs you have if no one else reading what you write.",
    "Your brains got you in into grad school, but they will not get you out of grad school.",
    "If you did not cry or laugh this week, how can you say that you learned something of importance.",
    "I can teach a monkey to write a dissertation, but even I can not tech a monkey to create the idea.",
    "Respect your academic elders, then explain to them why they are wrong.",
    "Dissertations are uniquely similar.",
    "If you do not get frustrated as a graduate learner you are just taking classes",
    "Everyone has their own price in writing your dissertation. Mine is $1,000,000. Yours should be related to the desire to change the world.",
    "Having a PhD is not the same thing as being a PhD.",
    "I can give you 100 reasons to not get a PhD. You need to give me one reason to get one that will remain true for at least 3-5 years.",
    "99% of the words spoken by most people are BS. 98% of the words spoken by PhDs are BS. Be a 1%.",
    "If we knew everything already, there would be no need for you.",
    "Being intelligent only makes you different, not better.",
    "The PhD is a leadership degree. Where are you leading us?",
    "The voice of a PhD makes mountains tremble and children cry. Speak softly and you will be heard more.",
    "Passion for a topic does not equate to knowledge and interest will never supplant the daily grind.",
    "Read your dissertation 10 years after you graduate. Everyone needs to laugh.",
    "I believe a number of things. I know a few things and understand even less. Hel me understand more.",
    "Dissertations make the world look just a bit less dim",
    "Learning to say “no” should be the second lesson learned as a graduate learner. “I don’t know” should be the first lesson you learn.",
    "Rule 1: Never leave your committee in the dark. Unless you like to have 4 angry old people asking questions.",
    "Rule 2: I know a lot of successful people who do not journal. I never met a person who journals that is not successful.",
    "Rule 3: Always be professional as a graduate learner. Especially when you wish to punch a colleague or advisor in the face.",
    "Rule 4: If you do not speak to your advisor every week, their (insert pet rock’s name) becomes more important to them than you.",
    "Rule 5: The only person who can prevent you from finishing your PhD is wearing shoes. So, do not give your shoes to someone else.",
    "Rule 6: The dissertation is not about the truth. The dissertation is a story. Tell the world a good story.",
    "Rule 7: Never go anywhere without your journal.",
    "Rule 8: Dissertations are never complete, just submitted.",
    "Rule 9: Never ask a committee member what they think, tell them what they need.",
    "Rule 10: Research is messy, do not be afraid to get dirty.",
    "The secretary and janitor in your department are the most important people at your university.",
    "Never let anyone or anything come between you and your PhD. The world is full of ABDs who did.",
    "My dissertation was written by me, but informed by hundreds of voices I heard from the literature. Whose voices will inform your dissertation?",
    "Every mistake you make gets you closer to finish your dissertation.",
    "Telling everyone on your committee one thing will take at least a month. Keep communication lanes open.",
    "Family comes first. Stay away from professors who do not get this point.",
    "Just because you know something, does not mean you understand. That takes at least a dissertation.",
    "The longest day of your life will occur during the first 15 minutes you spend writing your dissertation.",
    "No one finished a dissertation without starting with a blank page.",
    "The best way to know how you are on the right path as a researcher is to see how your work connects to the work of another researcher.",
    "Never let graduate school get in the way of your learning.",
    "A PhD requires all of your sweat, blood, and tears paid in advance with no guarantee of success.",
    "60. If you have to say you’re a PhD, you are not one. One day, you will know when someone else recognizes you as one.",
  ];

  useEffect(() => {
    setRandomValue(array[Math.floor(Math.random() * array.length)]);
  }, []);

  return <div>{randomValue}</div>;
}
