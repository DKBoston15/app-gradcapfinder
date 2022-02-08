import React, { useEffect, useState } from "react";

export default function DailyAffirmation() {
  const [randomValue, setRandomValue] = useState("");
  const array = [
    "Dissertations are written 15 minutes/day and not 8 hrs/Saturday.",
    "Your work will change the world in ways you will never know.",
    "Why haven’t you read your advisors dissertation?",
    "What do you think your advisor thinks a dissertation should like? Hint: They wrote one.",
    "How many PhDs does it take to write a dissertation? One advisor to drive you nuts and 3-4 on a committee to confuse you.",
    "It takes a village to write a dissertation and a committee to verify one.",
    "Who are your 3-7 authors? Why aren’t you one of them?",
    "Never fail to say, “I don’t know”, in a room full of smart people. The ones who agree with you are the ones you should get know.",
    "Use evidence to express your ideas. This forces others to think.",
    "Your family love to hear you speak about your research; unfortunately, 7 billion other people in this world do not care as much.",
    "Graduate schools are data rich but analysis poor. Many dissertations work the other way.",
    "Completing a dissertation will take as long as it takes. Don’t let anyone tell you differently.",
    "Yoda was write! Now do it!!",
    "You will always be your own worst critic. This does not mean you know are correct. Let others help you.",
    "Descartes was right! I fail, therefore I learn.",
    "Churchill was close. The graduate experience is a burden, wrapped in anxiety, inside self-doubt.",
    "If everyone is worried about this, you should worry about that.",
    "Every day spent not thinking about your dissertation adds 3 days spent living in graduate limbo.",
    "Nobody cares about your pub count if nobody reads what you write.",
    "Your brains got you in grad school, but they will not get you out.",
    "If you did not cry or laugh this week, how can you say that you learned something of importance.",
    "I can teach a monkey to write a dissertation, but I cannot teach a monkey to create the idea within that dissertation.",
    "Respect your academic elders, then explain to them why they are wrong.",
    "Dissertations are uniquely similar or similarly unique.",
    "If you do not get frustrated as a graduate learner you are just taking classes.",
    "Everyone has their own price in writing a dissertation. Your price should reflect your desire to change the world.",
    "Having a PhD is not the same thing as being a PhD.",
    "I can give you 100 reasons to not get a PhD. You need to give me one reason to get one that will remain true for at least 3-5 years.",
    "99% of the words spoken by most people are BS. 98% of the words spoken by PhDs are BS. Be a '1%.'",
    "If we already knew everything, we would not need you to write a dissertation.",
    "Being intelligent makes you different, not better.",
    "The PhD is a leadership degree. Where are you leading the world?",
    "The voice of a PhD makes mountains tremble and children cry, so speak softly.",
    "Passion for a topic does not equate to knowledge and interest does not supplant the daily grind.",
    "Read your dissertation every 10 years. You will enjoy the laugh.",
    "I believe a number of things. I know a few things. I understand even less. Help me understand more.",
    "Dissertations make the world just a little less dim.",
    "Learning to say “no” should be your second lesson in graduate school. Learning to say “I don’t know” should be the first.",
    "Rule 1: Never leave your committee in the dark. Unless you like having 4 angry old people in your life.",
    "Rule 2: I know a lot of successful people who do not journal. I never met a person with a journal that was not successful.",
    "Rule 3: Always be professional. Especially when you wish to punch someone in the face.",
    "Rule 4: If you do not speak to your advisor every week, their (insert pet rock’s name) becomes more important to them than you.",
    "Rule 5: The only person who can prevent you from finishing your PhD is wearing shoes. So, do not give your shoes to someone else.",
    "Rule 6: The dissertation is not about truth. The dissertation is about a story. Tell the world a good story.",
    "Rule 7: Never go anywhere without your journal.",
    "Rule 8: Dissertations are never complete, just submitted.",
    "Rule 9: Never ask a committee member what they think, tell them what they need.",
    "Rule 10: Research is messy, do not worry about getting dirty.",
    "The secretary and janitor in your department are the most important people at your university.",
    "Never let anyone or anything come between you and your PhD. The world is full of ABDs who did.",
    "My dissertation was written by me, but informed by hundreds of voices I heard from the literature. Whose voices will inform your dissertation?",
    "Every mistake you commit in life gets you closer to finishing your dissertation.",
    "Telling everyone on your committee one thing takes about a month. Think before you start speaking.",
    "Family comes first. Stay away from people in graduate school who disagree.",
    "Just because you know something, does not mean you possess understanding. Writing a dissertation is the first step to understanding.",
    "The longest day of your life will occur during the first 15 minutes spent writing your dissertation.",
    "No one finished a dissertation without starting on a blank page.",
    "The best way to know if you are on the right path as a researcher is to see how well your work connects to the work of other researchers.",
    "Never let graduate school get in the way of your learning.",
    "A PhD requires all of your sweat, blood, and tears; paid in advance, with no guarantee of success.",
    "If you have to say you’re a PhD, you are not one. You will know on the day someone else recognizes you as a PhD.",
    "Learning centers on developing the ability to think beyond that which is known. Where is your center?",
    "Arguments with your advisor create less stress when you first negotiate with yourself.",
    "You should learn to question things without giving up on things.",
    "Nothing happens in graduate school that a learner cannot bear without the help of their colleagues.",
    "In the pursuit of equality, many settle for mediocrity. Do not sacrifice the former for the latter.",
    "The more people you know underground, the less you worry about what the people above ground think of you.",
    "Failure precedes learning, reflecting and understanding. Can you identify three better pillars of success in graduate school?",
    "Ask me about my jackknifing and I will tell you about your sampling.",
    "Embrace the beauty of the journeys, not the bitterness of the pages.",
    "Learn to lead and not to chafe. You did not go to graduate school to become a follower.",
    "The rejection-feedback loop is one of the best indicators for your success.",
    "Conditional training will help in your intellectual onslaught as a graduate learner.",
    "Do not confuse your work for your worth, others do that for you.",
    "Few people get to choose who or what they will be in life. Never stop being thankful for your opportunity to do both.",
    "I never offer opinions when I can offer evidence, instead.",
    "Graduate school is for learning, not for knowing.",
    "If medical doctors were “real” doctors, they would not need a modifier.",
    "Anyone can find answers in the back of a book. A PhD put the answers there.",
    "Grifters talk, smart people write, politicians lead. PhDs talk about what they write as they lead.",
    "Anyone can write a dissertation. The trick is to write one that others wish to read.",
    "Being smart got you into graduate school. Being smart will not get you out.",
    "I sat next to a lot of confused people when I received my PhD. Most of them are still confused but now they teach in universities.",
    "Metacognition will help you in graduate school. Not sure about that? Just reflect for a bit and I am sure you will agree with me.",
    "No one finished a PhD without a list of failures on their CV.",
    "Failure is not the option. The option is what you do after your failure.",
  ];

  useEffect(() => {
    setRandomValue(array[Math.floor(Math.random() * array.length)]);
  }, []);

  return (
    <div className="flex flex-col items-end w-4/5">
      <div className="flex flex-col items-center w-11/12 pt-4 relative">
        <div className="absolute left-20 top-1">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35px"
            height="35px"
            viewBox="0 0 95.333 95.332"
            className="dark:hidden"
          >
            <g>
              <g>
                <path
                  d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793
			c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045
			s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076
			c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002
			c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z"
                />
                <path
                  d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019
			c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23
			c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16
			c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312
			c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>

        <div className="flex justify-between bg-primary p-6 rounded-xl w-11/12 h-32">
          <div className="text-2xl text-white w-5/6">{randomValue}</div>
          <div className="w-115 absolute right-20 bottom-2">
            <img src="/trophy.png" />
          </div>
        </div>
        <hr className="border-4 border-black w-90/100 border-subtleOrange rounded-b-xl" />
      </div>
    </div>
  );
}
