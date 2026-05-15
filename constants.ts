/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from './types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'This Is Me!',
    emoji: '👤',
    goal: 'Introduce yourself using basic personal information.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'name', options: ['What you are called', 'How old you are', 'Where you are from', 'Your favorite food'], answer: 'What you are called' },
            { word: 'age', options: ['What you are called', 'How old you are', 'A type of fruit', 'Your school name'], answer: 'How old you are' },
            { word: 'from', options: ['Where you come from', 'What you like', 'Your birthday', 'A friend'], answer: 'Where you come from' },
            { word: 'favourite', options: ['The one you like most', 'The one you like least', 'Something boring', 'A color'], answer: 'The one you like most' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "My name ___ Rafi.", options: ["is", "am", "are"], answer: "is" },
            { text: "I ___ 13 years old.", options: ["is", "am", "are"], answer: "am" },
            { text: "She ___ my sister.", options: ["is", "am", "are"], answer: "is" },
            { text: "We ___ students.", options: ["is", "am", "are"], answer: "are" },
            { text: "They ___ from Dhaka.", options: ["is", "am", "are"], answer: "are" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "I am a student at SEJ and I love learning English.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "My favorite food is a pizza made of paper and ink.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Dhaka is a city in Bangladesh.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Meeting a new classmate for the first time in the hallway.",
              options: [
                { label: 'A', text: "Hi! My name is Rafi. What is your name?" },
                { label: 'B', text: "It is a pen. I like school very much today." },
                { label: 'C', text: "Me name is Rafi. You name what?" }
              ],
              answer: "Hi! My name is Rafi. What is your name?"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch2',
    number: 2,
    title: "Let's Ask!",
    emoji: '❓',
    goal: 'Master the art of forming complex questions to gather detailed information.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'interrogate', options: ['To ask questions formally', 'To answer briefly', 'To ignore a request', 'To speak loudly'], answer: 'To ask questions formally' },
            { word: 'inquiry', options: ['An act of asking for information', 'A statement of fact', 'A type of punctuation', 'A loud noise'], answer: 'An act of asking for information' },
            { word: 'clarification', options: ['Making something easier to understand', 'Making something more confusing', 'Asking for money', 'Deleting a file'], answer: 'Making something easier to understand' },
            { word: 'rhetorical', options: ['A question asked for effect, not an answer', 'A question with many answers', 'A scientific theory', 'A difficult puzzle'], answer: 'A question asked for effect, not an answer' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "___ did you manage to solve the puzzle so quickly?", options: ["How", "What", "Who"], answer: "How" },
            { text: "Could you please tell me ___ the nearest library is located?", options: ["where", "when", "why"], answer: "where" },
            { text: "I wonder ___ he decided to leave without saying goodbye.", options: ["why", "what", "which"], answer: "why" },
            { text: "To ___ should I address this formal complaint?", options: ["whom", "who", "whose"], answer: "whom" },
            { text: "___ of these two options do you find more appealing?", options: ["Which", "What", "How"], answer: "Which" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "A 'query' is another word for a question.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "We use 'when' to ask about a physical location like a park.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Asking 'why' helps us understand the reason behind something.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Asking a librarian for the location of the science books.",
              options: [
                { label: 'A', text: "Excuse me, where can I find the science section?" },
                { label: 'B', text: "Give me the book now please, I need it." },
                { label: 'C', text: "Where is the book is located in this room?" }
              ],
              answer: "Excuse me, where can I find the science section?"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Meet the Family',
    emoji: '👨👩👧',
    goal: 'Describe complex family structures and relationships with precision.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'ancestor', options: ['A relative from the past', 'A newborn baby', 'A friend of the family', 'A neighbor'], answer: 'A relative from the past' },
            { word: 'sibling', options: ['A brother or sister', 'A cousin', 'A parent', 'A grandparent'], answer: 'A brother or sister' },
            { word: 'guardian', options: ['A person legally responsible for a child', 'A teacher', 'A younger brother', 'A pet'], answer: 'A person legally responsible for a child' },
            { word: 'lineage', options: ['Direct descent from an ancestor', 'A type of house', 'A middle name', 'A family secret'], answer: 'Direct descent from an ancestor' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "My eldest brother, ___ is a doctor, lives in London.", options: ["who", "whom", "whose"], answer: "who" },
            { text: "This is the photograph of the village ___ my ancestors were born.", options: ["where", "which", "when"], answer: "where" },
            { text: "Neither my sister nor my brothers ___ going to the reunion.", options: ["are", "is", "am"], answer: "are" },
            { text: "She is the aunt ___ advice I value the most.", options: ["whose", "who", "whom"], answer: "whose" },
            { text: "My parents ___ married for twenty-five years.", options: ["have been", "were", "is"], answer: "have been" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "A sibling refers to either your brother or your sister.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "An ancestor is a person who will be born into your family in the future.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A guardian is someone responsible for taking care of another person.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Introducing your elder brother to your group of friends at a party.",
              options: [
                { label: 'A', text: "Guys, this is my brother. He is much older than me." },
                { label: 'B', text: "Everyone, I'd like you to meet my elder brother, Tanvir." },
                { label: 'C', text: "He is my family and he is a doctor in the city." }
              ],
              answer: "Everyone, I'd like you to meet my elder brother, Tanvir."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Friends Forever',
    emoji: '🤝',
    goal: 'Analyze the dynamics of friendship and describe qualities of companions.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'loyalty', options: ['Being firm and constant in support', 'Being funny', 'Having many toys', 'Talking a lot'], answer: 'Being firm and constant in support' },
            { word: 'trustworthy', options: ['Able to be relied on as honest or truthful', 'Rich and powerful', 'Fast and energetic', 'Quiet and shy'], answer: 'Able to be relied on as honest or truthful' },
            { word: 'empathy', options: ['The ability to understand others\' feelings', 'A lack of interest', 'Strong physical strength', 'A type of skill'], answer: 'The ability to understand others\' feelings' },
            { word: 'companionship', options: ['Fellowship or friendship', 'A business partnership', 'A scientific experiment', 'A long journey'], answer: 'Fellowship or friendship' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "A good friend is someone ___ you can always count on.", options: ["whom", "who", "which"], answer: "whom" },
            { text: "Friendship requires ___ effort from both parties.", options: ["continuous", "continual", "continue"], answer: "continuous" },
            { text: "I have known my best friend ___ more than a decade.", options: ["for", "since", "during"], answer: "for" },
            { text: "He is the most ___ person I have ever met.", options: ["trustworthy", "trust", "trusting"], answer: "trustworthy" },
            { text: "Strong friendships ___ over time through shared experiences.", options: ["develop", "develops", "developing"], answer: "develop" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Loyalty means supporting a friend even when it's difficult.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "Empathy is the ability to ignore how other people feel.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A trustworthy person is someone you can rely on to be honest.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Your friend is feeling sad after failing an important test.",
              options: [
                { label: 'A', text: "Don't worry about it, it was just a silly test anyway." },
                { label: 'B', text: "I'm so sorry. I know how hard you worked. Want to study together next time?" },
                { label: 'C', text: "I passed the test easily, you should have studied more like me." }
              ],
              answer: "I'm so sorry. I know how hard you worked. Want to study together next time?"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Morning to Night',
    emoji: '☀️',
    goal: 'Talk about daily routines and habits.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'always', options: ['100% of the time', 'most of the time', 'not every day', '0% of the time'], answer: '100% of the time' },
            { word: 'usually', options: ['100% of the time', 'most of the time', 'not every day', '0% of the time'], answer: 'most of the time' },
            { word: 'sometimes', options: ['100% of the time', 'most of the time', 'not every day', '0% of the time'], answer: 'not every day' },
            { word: 'never', options: ['100% of the time', 'most of the time', 'not every day', '0% of the time'], answer: '0% of the time' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "Dihan always ___ at 6 am.", options: ["wake up", "wakes up", "waking up"], answer: "wakes up" },
            { text: "She ___ has lunch at school.", options: ["usually", "never", "always"], answer: "usually" },
            { text: "I ___ eat junk food.", options: ["never", "always", "sometimes"], answer: "never" },
            { text: "He ___ his homework after school.", options: ["do", "does", "doing"], answer: "does" },
            { text: "They sometimes ___ football in the park.", options: ["play", "plays", "playing"], answer: "play" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "If you do something every single day, you 'always' do it.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "The word 'never' means that something happens 50% of the time.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A routine is a sequence of actions regularly followed.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Describing your typical morning routine to a new friend.",
              options: [
                { label: 'A', text: "I sleep until noon every day and never eat breakfast." },
                { label: 'B', text: "I usually wake up at 7 am, brush my teeth, and then have a nutritious breakfast." },
                { label: 'C', text: "Morning is a time when the sun comes up and the birds sing songs." }
              ],
              answer: "I usually wake up at 7 am, brush my teeth, and then have a nutritious breakfast."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch6',
    number: 6,
    title: 'School Stories',
    emoji: '🏫',
    goal: 'Narrate complex school experiences and academics using advanced structures.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'curriculum', options: ['The courses offered by an educational institution', 'A school bag', 'A student leader', 'A long holiday'], answer: 'The courses offered by an educational institution' },
            { word: 'academic', options: ['Relating to education and scholarship', 'Related to sports', 'Boring and useless', 'Very fast'], answer: 'Relating to education and scholarship' },
            { word: 'collaboration', options: ['The action of working with someone to produce something', 'Studying alone', 'Asking for help', 'Competing for grades'], answer: 'The action of working with someone to produce something' },
            { word: 'extracurricular', options: ['Activities pursued in addition to the normal course of study', 'Difficult homework', 'A type of science', 'School uniform'], answer: 'Activities pursued in addition to the normal course of study' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "If I ___ harder, I would have passed the exam.", options: ["had studied", "study", "studied"], answer: "had studied" },
            { text: "The students ___ to finish the project by Friday.", options: ["are expected", "expect", "expecting"], answer: "are expected" },
            { text: "She is the student ___ essay won the competition.", options: ["whose", "who", "whom"], answer: "whose" },
            { text: "Academic success depends ___ consistent effort.", options: ["on", "at", "in"], answer: "on" },
            { text: "Neither the teacher nor the students ___ aware of the change.", options: ["were", "was", "is"], answer: "were" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Extracurricular activities are part of the main school curriculum.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Collaboration involves working together with others to achieve a goal.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "Academic success is often the result of consistent effort and study.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Explaining a difficult science project to your teacher.",
              options: [
                { label: 'A', text: "I didn't do it because it was too boring and difficult." },
                { label: 'B', text: "Our project explores how solar energy can be used to power small devices." },
                { label: 'C', text: "Science is a subject that I really like sometimes at school." }
              ],
              answer: "Our project explores how solar energy can be used to power small devices."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Favourites in School',
    emoji: '❤️',
    goal: 'Express preferences and justifications for academic subjects and activities.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'aptitude', options: ['A natural ability to do something', 'A strong dislike', 'A type of book', 'A school grade'], answer: 'A natural ability to do something' },
            { word: 'fascinating', options: ['Extremely interesting', 'Very boring', 'Very dangerous', 'Too easy'], answer: 'Extremely interesting' },
            { word: 'preference', options: ['A greater liking for one alternative over others', 'A strict rule', 'A heavy bag', 'A fast runner'], answer: 'A greater liking for one alternative over others' },
            { word: 'discipline', options: ['A particular branch of knowledge', 'A punishment', 'A noisy room', 'A morning routine'], answer: 'A particular branch of knowledge' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "I prefer science ___ arts.", options: ["to", "than", "over"], answer: "to" },
            { text: "The reason ___ I like history is because it's like a story.", options: ["why", "that", "which"], answer: "why" },
            { text: "She would rather ___ laboratory work than read theory.", options: ["do", "does", "doing"], answer: "do" },
            { text: "Physics is considered one of the most ___ subjects.", options: ["challenging", "challenge", "challenged"], answer: "challenging" },
            { text: "Everyone in the class ___ their own favorite subject.", options: ["has", "have", "having"], answer: "has" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "An aptitude is a natural ability or talent for something.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "If you find a subject 'fascinating', it means you think it's very boring.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A preference means you like one thing more than another.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Choosing elective subjects for the next semester with a counselor.",
              options: [
                { label: 'A', text: "I don't care which subjects I take, just pick for me." },
                { label: 'B', text: "I have a strong preference for Mathematics because I find the logic fascinating." },
                { label: 'C', text: "School subjects are important for the future of all students." }
              ],
              answer: "I have a strong preference for Mathematics because I find the logic fascinating."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Describing Rooms',
    emoji: '🛋️',
    goal: 'Provide detailed descriptions of spaces and interior arrangements.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'spacious', options: ['Having ample space', 'Very small and tight', 'Decorated with many colors', 'Located on a high floor'], answer: 'Having ample space' },
            { word: 'minimalist', options: ['A style characterized by simplicity', 'A room full of many objects', 'A dark and damp place', 'A traditional design'], answer: 'A style characterized by simplicity' },
            { word: 'atmosphere', options: ['The pervading tone or mood of a place', 'The air structure', 'The roof of a house', 'The furniture arrangement'], answer: 'The pervading tone or mood of a place' },
            { word: 'cluttered', options: ['Untidy and full of objects', 'Very clean and empty', 'Large and open', 'Brightly lit'], answer: 'Untidy and full of objects' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "The sofa is placed ___ the two windows.", options: ["between", "among", "along"], answer: "between" },
            { text: "There isn't ___ furniture in the guest room.", options: ["much", "many", "a lot"], answer: "much" },
            { text: "The room is ___ smaller than I expected.", options: ["slightly", "slight", "as"], answer: "slightly" },
            { text: "The shelf is fixed ___ the wall.", options: ["onto", "at", "to"], answer: "onto" },
            { text: "The atmosphere of the library is ___ conducive to study.", options: ["highly", "high", "highest"], answer: "highly" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "A spacious room has a lot of open area and feels large.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A minimalist style is characterized by having as many decorations as possible.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A cluttered room is untidy and full of too many objects.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Describing your dream bedroom design to an interior decorator.",
              options: [
                { label: 'A', text: "I want a room with a bed and a chair and maybe a lamp." },
                { label: 'B', text: "I prefer a minimalist design to create a calm and peaceful atmosphere." },
                { label: 'C', text: "The room should be painted in a color that is not too bright." }
              ],
              answer: "I prefer a minimalist design to create a calm and peaceful atmosphere."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch9',
    number: 9,
    title: 'Doing What I Love',
    emoji: '🎨',
    goal: 'Discuss hobbies and passions with emphasis on personal growth and skill.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'perseverance', options: ['Persistence in doing something despite difficulty', 'Giving up easily', 'Having a lot of luck', 'Fast learning'], answer: 'Persistence in doing something despite difficulty' },
            { word: 'accomplishment', options: ['Something that has been achieved successfully', 'A huge failure', 'A future plan', 'A daily chore'], answer: 'Something that has been achieved successfully' },
            { word: 'therapeutic', options: ['Having a good effect on the body or mind', 'Very stressful', 'Useless and boring', 'Expensive'], answer: 'Having a good effect on the body or mind' },
            { word: 'versatile', options: ['Able to adapt or be used in many ways', 'Very rigid', 'Slow moving', 'Hard to learn'], answer: 'Able to adapt or be used in many ways' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "___ takes a lot of practice to master.", options: ["Painting", "Paint", "Painted"], answer: "Painting" },
            { text: "He is interested ___ learning how to play the guitar.", options: ["in", "on", "at"], answer: "in" },
            { text: "She enjoys ___ to classical music in her free time.", options: ["listening", "listen", "to listen"], answer: "listening" },
            { text: "The hobbiest ___ a great deal of time on his project.", options: ["spends", "spend", "spending"], answer: "spends" },
            { text: "If I have enough free time, I ___ practicing my hobby.", options: ["will continue", "continued", "continue"], answer: "will continue" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Perseverance means giving up as soon as a task becomes difficult.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "An accomplishment is something that you have achieved successfully.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A versatile hobby is one that can be enjoyed in many different ways.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Being interviewed about your passion for photography.",
              options: [
                { label: 'A', text: "I like taking pictures because it's a fun thing to do." },
                { label: 'B', text: "Photography allows me to express my creativity and see the world differently." },
                { label: 'C', text: "Cameras are expensive and sometimes they can break easily." }
              ],
              answer: "Photography allows me to express my creativity and see the world differently."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch10',
    number: 10,
    title: 'Food for Thought',
    emoji: '🍛',
    goal: 'Navigate culinary topics and health-conscious eating habits.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'nutritious', options: ['Providing efficient nourishment', 'Tasting very sweet', 'Expensive to buy', 'Easy to cook'], answer: 'Providing efficient nourishment' },
            { word: 'delicacy', options: ['A choice or expensive food', 'A type of fast food', 'A cooking tool', 'A food allergy'], answer: 'A choice or expensive food' },
            { word: 'staple', options: ['A basic or main item e.g. food', 'A metal fastener', 'A new recipe', 'A dessert'], answer: 'A basic or main item e.g. food' },
            { word: 'cuisine', options: ['A style or method of cooking', 'A large kitchen', 'A type of fruit', 'A meal time'], answer: 'A style or method of cooking' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "There isn't ___ sugar left in the jar.", options: ["much", "many", "few"], answer: "much" },
            { text: "Bengali food is ___ for its spicy flavor.", options: ["renowned", "renown", "renowning"], answer: "renowned" },
            { text: "Would you like ___ more rice?", options: ["any", "some", "few"], answer: "some" },
            { text: "The chef ___ the meal with great precision.", options: ["prepared", "prepare", "preparing"], answer: "prepared" },
            { text: "A balanced diet consists ___ various food groups.", options: ["of", "in", "with"], answer: "of" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Nutritious food provides the body with the vitamins and minerals it needs.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'staple' food is one that is rarely eaten in a particular culture.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Cuisine refers to a specific style or method of cooking.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Ordering a healthy meal at a restaurant with your family.",
              options: [
                { label: 'A', text: "I want the biggest burger and the largest fries you have." },
                { label: 'B', text: "I'll have the grilled salmon with a side of steamed vegetables, please." },
                { label: 'C', text: "Food is very important for humans to live and grow every day." }
              ],
              answer: "I'll have the grilled salmon with a side of steamed vegetables, please."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch11',
    number: 11,
    title: 'Stay Healthy!',
    emoji: '💪',
    goal: 'Examine health advice and physiological well-being.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'endurance', options: ['The ability to sustain prolonged physical effort', 'Immediate speed', 'Being very tall', 'Having a lot of friends'], answer: 'The ability to sustain prolonged physical effort' },
            { word: 'hydration', options: ['The process of absorbing water', 'Eating a lot of food', 'Sleeping many hours', 'Running fast'], answer: 'The process of absorbing water' },
            { word: 'sedentary', options: ['Spending too much time seated', 'Very active and athletic', 'Living in a quiet place', 'Always traveling'], answer: 'Spending too much time seated' },
            { word: 'well-being', options: ['The state of being comfortable or healthy', 'Having a lot of money', 'Being very famous', 'Passing an exam'], answer: 'The state of being comfortable or healthy' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "You ___ drink at least eight glasses of water a day.", options: ["should", "might", "can"], answer: "should" },
            { text: "Exercising regularly ___ prevent many health issues.", options: ["can", "shall", "must"], answer: "can" },
            { text: "It is important ___ a healthy weight.", options: ["to maintain", "maintaining", "maintain"], answer: "to maintain" },
            { text: "She feels much ___ after she started yoga.", options: ["better", "well", "best"], answer: "better" },
            { text: "Don't forget ___ after a long workout.", options: ["to stretch", "stretching", "stretch"], answer: "to stretch" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Hydration is the process of losing as much water from your body as possible.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Endurance is the ability to sustain physical effort over a long period.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A sedentary lifestyle involves spending a lot of time sitting or lying down.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Encouraging a friend to start a new exercise routine.",
              options: [
                { label: 'A', text: "You should stay home and watch TV, it's much safer." },
                { label: 'B', text: "Starting a daily walk can significantly improve your overall well-being." },
                { label: 'C', text: "Exercise is something that people do at the gym sometimes." }
              ],
              answer: "Starting a daily walk can significantly improve your overall well-being."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch12',
    number: 12,
    title: 'Places Around Me',
    emoji: '🗺️',
    goal: 'Navigate urban environments and describe geographical landmarks.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'metropolis', options: ['A large and densely populated city', 'A small village', 'An island', 'A desert'], answer: 'A large and densely populated city' },
            { word: 'landmark', options: ['A recognizable feature of a landscape/city', 'A type of tool', 'A secret place', 'A name of a person'], answer: 'A recognizable feature of a landscape/city' },
            { word: 'infrastructure', options: ['The basic organizational structures of a place', 'A type of plant', 'A style of clothing', 'A cloud formation'], answer: 'The basic organizational structures of a place' },
            { word: 'proximity', options: ['Nearness in space, time, or relationship', 'Distance between places', 'Speed of travel', 'Altitude of a mountain'], answer: 'Nearness in space, time, or relationship' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "My school is located ___ the post office.", options: ["opposite", "among", "along"], answer: "opposite" },
            { text: "There are ___ famous landmarks in the city.", options: ["many", "much", "little"], answer: "many" },
            { text: "The new bridge ___ improve the city's infrastructure.", options: ["will", "was", "has"], answer: "will" },
            { text: "He lives in close ___ to the train station.", options: ["proximity", "proximate", "proximating"], answer: "proximity" },
            { text: "___ way should I take to reach the park?", options: ["Which", "What", "How"], answer: "Which" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "A metropolis is a very small and isolated village in the mountains.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A landmark is a famous and recognizable feature of a city or landscape.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "Infrastructure refers to basic structures like roads, bridges, and power lines.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Giving directions to a tourist who is looking for the National Museum.",
              options: [
                { label: 'A', text: "The museum is a building with many old things inside it." },
                { label: 'B', text: "Go straight for two blocks, then turn left at the historic landmark." },
                { label: 'C', text: "I think the museum is somewhere in this city, but I'm not sure." }
              ],
              answer: "Go straight for two blocks, then turn left at the historic landmark."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch13',
    number: 13,
    title: 'Fast Life, Slow Life',
    emoji: '🏙️',
    goal: 'Compare city life and village life.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'busier', options: ['more busy than something else', 'more quiet and peaceful', 'more people in one place', 'less dirty than something else'], answer: 'more busy than something else' },
            { word: 'quieter', options: ['more busy than something else', 'more quiet and peaceful', 'more people in one place', 'less dirty than something else'], answer: 'more quiet and peaceful' },
            { word: 'more crowded', options: ['more busy than something else', 'more quiet and peaceful', 'more people in one place', 'less dirty than something else'], answer: 'more people in one place' },
            { word: 'cleaner', options: ['more busy than something else', 'more quiet and peaceful', 'more people in one place', 'less dirty than something else'], answer: 'less dirty than something else' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "Dhaka is ___ than my village.", options: ["busier", "more busier", "busy"], answer: "busier" },
            { text: "The village has ___ trees than the city.", options: ["more", "much", "many"], answer: "more" },
            { text: "City hospitals are ___ than village ones.", options: ["better", "more better", "gooder"], answer: "better" },
            { text: "There is ___ traffic in the city.", options: ["many", "a lot of", "much"], answer: "a lot of" },
            { text: "Village life is ___ than city life.", options: ["more relaxed", "relaxeder", "most relaxed"], answer: "more relaxed" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Cities are generally quieter and more peaceful than rural villages.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A 'crowded' place is one that has a large number of people in it.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "Village life is often considered to be slower and more relaxed than city life.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Discussing the pros and cons of moving from the village to the city.",
              options: [
                { label: 'A', text: "The city has more opportunities, but the village is much cleaner." },
                { label: 'B', text: "Cities are big and villages are small, that is the main difference." },
                { label: 'C', text: "I want to live in a place where there are many trees and cars." }
              ],
              answer: "The city has more opportunities, but the village is much cleaner."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch14',
    number: 14,
    title: 'Seasons and Weather',
    emoji: '🌧️',
    goal: 'Analyze climatic patterns and their impact on daily life.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'humidity', options: ['The amount of water vapor in the air', 'Dry and hot weather', 'A type of storm', 'A cold wind'], answer: 'The amount of water vapor in the air' },
            { word: 'precipitation', options: ['Any form of water that falls from clouds', 'A fast chemical reaction', 'A sunny day', 'A change in temperature'], answer: 'Any form of water that falls from clouds' },
            { word: 'temperate', options: ['A climate without extreme heat or cold', 'Very hot and dry', 'Frozen all year', 'Always raining'], answer: 'A climate without extreme heat or cold' },
            { word: 'monsoon', options: ['A seasonal prevailing wind bringing rain', 'A small shower', 'A desert wind', 'A type of cloud'], answer: 'A seasonal prevailing wind bringing rain' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "It ___ heavily tomorrow according to the forecast.", options: ["will rain", "rains", "rained"], answer: "will rain" },
            { text: "The humidity is ___ higher today than yesterday.", options: ["much", "many", "few"], answer: "much" },
            { text: "If the monsoon ___ late, the crops might fail.", options: ["arrives", "arrive", "arriving"], answer: "arrives" },
            { text: "We should prepare ___ the upcoming storm.", options: ["for", "at", "to"], answer: "for" },
            { text: "Autumn is the ___ season of the year.", options: ["most pleasant", "more pleasant", "pleasantest"], answer: "most pleasant" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Humidity is the amount of water vapor present in the air.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'monsoon' is a type of dry desert wind that never brings rain.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Precipitation includes rain, snow, sleet, and hail.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Listening to a weather forecast about an upcoming tropical storm.",
              options: [
                { label: 'A', text: "The weather will be sunny and warm for the next few days." },
                { label: 'B', text: "Residents should prepare for heavy precipitation and strong winds starting tonight." },
                { label: 'C', text: "Rain is something that falls from the sky when it is cloudy." }
              ],
              answer: "Residents should prepare for heavy precipitation and strong winds starting tonight."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch15',
    number: 15,
    title: 'Dress to Impress',
    emoji: '👗',
    goal: 'Describe clothing and fashion choices with cultural awareness.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'attire', options: ['Clothes, especially fine or formal ones', 'A type of hat', 'A jewelry box', 'Looking in a mirror'], answer: 'Clothes, especially fine or formal ones' },
            { word: 'traditional', options: ['Existing in or as part of a long-established custom', 'New and modern', 'Very expensive', 'Uncomfortable'], answer: 'Existing in or as part of a long-established custom' },
            { word: 'sophisticated', options: ['Having a great deal of worldly experience and fashion sense', 'Simple and plain', 'Bright and colorful', 'Cheaply made'], answer: 'Having a great deal of worldly experience and fashion sense' },
            { word: 'vibrant', options: ['Full of energy and brightness', 'Dark and dull', 'Very tight', 'Old and worn'], answer: 'Full of energy and brightness' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "She ___ a beautiful saree to the party.", options: ["wore", "wear", "wearing"], answer: "wore" },
            { text: "This silk fabric is ___ softer than cotton.", options: ["much", "many", "few"], answer: "much" },
            { text: "Traditional attire is still ___ popular in rural areas.", options: ["highly", "high", "highest"], answer: "highly" },
            { text: "I prefer comfortable clothes ___ fashionable ones.", options: ["to", "than", "over"], answer: "to" },
            { text: "The embroidery was ___ by hand.", options: ["done", "did", "do"], answer: "done" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Traditional attire refers to clothing that is part of a long-established custom.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'vibrant' color is one that is very dark, dull, and hard to see.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Sophisticated fashion often involves worldly experience and a refined sense of style.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Describing the traditional clothing worn at a Bengali wedding.",
              options: [
                { label: 'A', text: "The bride wears a vibrant red saree with intricate gold embroidery." },
                { label: 'B', text: "People wear clothes that are comfortable for a long day of dancing." },
                { label: 'C', text: "Weddings are a time when families come together to celebrate life." }
              ],
              answer: "The bride wears a vibrant red saree with intricate gold embroidery."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch16',
    number: 16,
    title: 'Picture Perfect',
    emoji: '📷',
    goal: 'Critique visual arts and photography using descriptive language.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'composition', options: ['The arrangement of visual elements in a work of art', 'The price of a camera', 'A type of battery', 'The speed of light'], answer: 'The arrangement of visual elements in a work of art' },
            { word: 'aesthetic', options: ['A set of principles underlying the work of a particular artist', 'A heavy object', 'A type of medicine', 'A loud noise'], answer: 'A set of principles underlying the work of a particular artist' },
            { word: 'perspective', options: ['A particular attitude toward or way of regarding something', 'The size of a photo', 'A type of lens', 'The color of a frame'], answer: 'A particular attitude toward or way of regarding something' },
            { word: 'evocative', options: ['Bringing strong images, memories, or feelings to mind', 'Boring and plain', 'Very dark', 'Hard to see'], answer: 'Bringing strong images, memories, or feelings to mind' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "This photograph is ___ more evocative than that one.", options: ["far", "many", "few"], answer: "far" },
            { text: "The artist ___ his work for many years.", options: ["has been perfecting", "perfects", "perfected"], answer: "has been perfecting" },
            { text: "If I ___ a better camera, I would take more photos.", options: ["had", "have", "having"], answer: "had" },
            { text: "The composition ___ of several layers.", options: ["consists", "consisting", "consist"], answer: "consists" },
            { text: "Visual arts ___ a significant role in culture.", options: ["play", "plays", "playing"], answer: "play" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Composition in art refers to the arrangement of visual elements.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "An 'evocative' image is one that is extremely boring and brings no feelings to mind.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Aesthetic principles help define the style and beauty of an artist's work.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Critiquing a landscape photograph at an art gallery exhibition.",
              options: [
                { label: 'A', text: "The photo is big and it has many colors of green and blue." },
                { label: 'B', text: "The composition uses leading lines to create a stunning sense of perspective." },
                { label: 'C', text: "I like this picture because it reminds me of my grandmother's garden." }
              ],
              answer: "The composition uses leading lines to create a stunning sense of perspective."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch17',
    number: 17,
    title: 'In the Wild',
    emoji: '🐯',
    goal: 'Discuss biodiversity and environmental conservation efforts.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'biodiversity', options: ['The variety of life in the world or in a particular habitat', 'A type of plant', 'A scientific experiment', 'A zoo'], answer: 'The variety of life in the world or in a particular habitat' },
            { word: 'endangered', options: ['A species at risk of extinction', 'A very common animal', 'A dangerous predator', 'A pet'], answer: 'A species at risk of extinction' },
            { word: 'conservation', options: ['Prevention of wasteful use of a resource', 'Hunting for sport', 'Building a factory', 'Destroying a forest'], answer: 'Prevention of wasteful use of a resource' },
            { word: 'ecosystem', options: ['A biological community of interacting organisms', 'A type of computer program', 'A weather pattern', 'A single animal'], answer: 'A biological community of interacting organisms' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "We ___ protect endangered species before it's too late.", options: ["must", "might", "shall"], answer: "must" },
            { text: "Conservation programs ___ been successful in some areas.", options: ["have", "has", "is"], answer: "have" },
            { text: "If we ___ forests, we lose biodiversity.", options: ["destroy", "destroyed", "destroying"], answer: "destroy" },
            { text: "The ecosystem is ___ delicate than people realize.", options: ["more", "most", "as"], answer: "more" },
            { text: "Many animals are ___ threat due to habitat loss.", options: ["under", "at", "in"], answer: "under" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Biodiversity is the variety of life in a particular habitat or the world.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "An 'endangered' species is one that is very common and found everywhere.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Conservation effort aims to prevent the wasteful use of natural resources.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Discussing the importance of protecting the Sundarbans forest.",
              options: [
                { label: 'A', text: "The forest is large and has many tigers and trees in it." },
                { label: 'B', text: "Protecting this ecosystem is crucial for preserving local biodiversity." },
                { label: 'C', text: "Tigers are dangerous animals that live in the wild places of the world." }
              ],
              answer: "Protecting this ecosystem is crucial for preserving local biodiversity."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch18',
    number: 18,
    title: 'Beyond the Stars',
    emoji: '🚀',
    goal: 'Investigate the mysteries of the cosmos and the future of interstellar travel.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'astronomy', options: ['The branch of science that deals with celestial objects', 'The study of plants', 'A type of mountain climbing', 'Building rockets'], answer: 'The branch of science that deals with celestial objects' },
            { word: 'interstellar', options: ['Occurring or situated between stars', 'Very fast', 'Inside the earth', 'A type of food'], answer: 'Occurring or situated between stars' },
            { word: 'galaxy', options: ['A system of millions or billions of stars, together with gas and dust', 'A single star', 'A small planet', 'A type of telescope'], answer: 'A system of millions or billions of stars, together with gas and dust' },
            { word: 'constellation', options: ['A group of stars forming a recognizable pattern', 'A shooting star', 'A dark spot in space', 'A cloud of gas'], answer: 'A group of stars forming a recognizable pattern' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "By 2050, humans ___ discovered signs of life elsewhere.", options: ["will have", "has", "had"], answer: "will have" },
            { text: "The stars are ___ farther away than they appear.", options: ["much", "many", "few"], answer: "much" },
            { text: "If we ___ better technology, we could travel to Mars.", options: ["had", "have", "has"], answer: "had" },
            { text: "The galaxy contains ___ of stars.", options: ["billions", "billion", "billionth"], answer: "billions" },
            { text: "We must continue ___ the unknown.", options: ["exploring", "explore", "explored"], answer: "exploring" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Astronomy is the study of celestial objects like stars and planets.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'galaxy' is a single small star located inside our solar system.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Interstellar travel refers to travel occurring between stars.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Speculating about the possibility of human colonies on Mars.",
              options: [
                { label: 'A', text: "Mars is a red planet that is far away from our Earth." },
                { label: 'B', text: "Advancements in aerospace engineering could make interstellar travel a reality." },
                { label: 'C', text: "I want to be an astronaut and fly in a rocket to the moon." }
              ],
              answer: "Advancements in aerospace engineering could make interstellar travel a reality."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch19',
    number: 19,
    title: 'Flashback!',
    emoji: '⏪',
    goal: 'Reflect on past events and their long-term significance.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'reminisce', options: ['Indulge in enjoyable recollection of past events', 'Forget everything', 'Predict the future', 'Complain about life'], answer: 'Indulge in enjoyable recollection of past events' },
            { word: 'milestone', options: ['A significant stage or event in the development of something', 'A type of rock', 'A short distance', 'A daily task'], answer: 'A significant stage or event in the development of something' },
            { word: 'nostalgia', options: ['A sentimental longing for the past', 'A fear of the future', 'A type of food', 'A loud celebration'], answer: 'A sentimental longing for the past' },
            { word: 'transformative', options: ['Causing a marked change in someone or something', 'Remaining the same', 'Very boring', 'Small and unimportant'], answer: 'Causing a marked change in someone or something' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "I ___ to that school ten years ago.", options: ["went", "go", "gone"], answer: "went" },
            { text: "By the time he was twenty, he ___ several milestones.", options: ["had achieved", "achieves", "achieved"], answer: "had achieved" },
            { text: "We used to ___ cricket every afternoon.", options: ["play", "plays", "playing"], answer: "play" },
            { text: "That experience ___ my life completely.", options: ["transformed", "transforms", "transforming"], answer: "transformed" },
            { text: "I remember ___ very nervous on my first day.", options: ["being", "be", "was"], answer: "being" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Nostalgia is a sentimental longing or affection for the past.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'milestone' is a small and unimportant daily task that everyone does.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Transformative experiences cause a marked change in someone's life.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Reflecting on your first day of high school after graduating.",
              options: [
                { label: 'A', text: "School was a place where I learned many things for many years." },
                { label: 'B', text: "Starting high school was a major milestone that significantly shaped my character." },
                { label: 'C', text: "I remember that I had a blue backpack and a new uniform that day." }
              ],
              answer: "Starting high school was a major milestone that significantly shaped my character."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch20',
    number: 20,
    title: 'Festivals',
    emoji: '🎉',
    goal: 'Explain the cultural significance and traditions of diverse festivals.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'heritage', options: ['Valued objects and qualities passed down from previous generations', 'A type of food', 'A new inventions', 'A sports team'], answer: 'Valued objects and qualities passed down from previous generations' },
            { word: 'festivity', options: ['The celebration of something in a joyful and exuberant way', 'A quiet meeting', 'A working day', 'A sad event'], answer: 'The celebration of something in a joyful and exuberant way' },
            { word: 'symbolism', options: ['The use of symbols to represent ideas or qualities', 'A type of music', 'The price of a ticket', 'A mathematical formula'], answer: 'The use of symbols to represent ideas or qualities' },
            { word: 'community', options: ['A group of people living in the same place or having a particular characteristic in common', 'A single person', 'A distant country', 'A secret society'], answer: 'A group of people living in the same place or having a particular characteristic in common' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "The whole town ___ involved in the preparations.", options: ["is", "are", "am"], answer: "is" },
            { text: "Festivals are a great way ___ cultural heritage.", options: ["to preserve", "preserving", "preserve"], answer: "to preserve" },
            { text: "Everyone ___ happy during the celebration.", options: ["looks", "look", "looking"], answer: "looks" },
            { text: "We always ___ traditional clothes on this day.", options: ["wear", "wore", "wearing"], answer: "wear" },
            { text: "There is ___ much excitement in the air.", options: ["so", "too", "very"], answer: "so" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Heritage refers to valued objects and qualities passed down through generations.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "Symbolism is the use of math to calculate the cost of a festival ticket.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A community is a group of people living in the same place or sharing common traits.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Explaining the importance of Pohela Boishakh to an international visitor.",
              options: [
                { label: 'A', text: "It is a festival where people eat food and wear red and white clothes." },
                { label: 'B', text: "This festival is a celebration of our shared heritage and cultural identity." },
                { label: 'C', text: "New Year is a time when the calendar changes from one year to the next." }
              ],
              answer: "This festival is a celebration of our shared heritage and cultural identity."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch21',
    number: 21,
    title: 'My Dream Home',
    emoji: '🏡',
    goal: 'Envision and describe a personalised living space with creative detail.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'sustainable', options: ['Able to be maintained at a certain rate or level', 'Very expensive', 'Extremely old', 'Breaking easily'], answer: 'Able to be maintained at a certain rate or level' },
            { word: 'innovation', options: ['A new method, idea, or product', 'A tradition', 'A copy of something', 'A boring task'], answer: 'A new method, idea, or product' },
            { word: 'panoramic', options: ['With a wide view surrounding the observer', 'In a dark corner', 'Small and cramped', 'Looking downwards'], answer: 'With a wide view surrounding the observer' },
            { word: 'ambiance', options: ['The character and atmosphere of a place', 'The price of a house', 'The size of a room', 'The weight of a chair'], answer: 'The character and atmosphere of a place' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "My dream home ___ have a large garden.", options: ["would", "will", "shall"], answer: "would" },
            { text: "I want a house ___ is environmentally friendly.", options: ["that", "who", "whom"], answer: "that" },
            { text: "The view from the balcony ___ be panoramic.", options: ["will", "was", "is"], answer: "will" },
            { text: "If I ___ enough money, I would build this home.", options: ["had", "have", "having"], answer: "had" },
            { text: "A home should be a place ___ you feel safe.", options: ["where", "which", "when"], answer: "where" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "A sustainable building is designed to minimize its impact on the environment.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'panoramic' view is one that is very narrow and blocked by walls.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Innovation involves creating new methods, ideas, or products.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Describing the eco-friendly features of your dream house design.",
              options: [
                { label: 'A', text: "The house has many solar panels and it is located on a hilltop." },
                { label: 'B', text: "To ensure sustainability, the house will utilize smart energy management systems." },
                { label: 'C', text: "I want a home that is very large and has a swimming pool in the yard." }
              ],
              answer: "To ensure sustainability, the house will utilize smart energy management systems."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch22',
    number: 22,
    title: "Let's Plan",
    emoji: '📋',
    goal: 'Develop organizational skills and express future intentions.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'prioritize', options: ['Determine the order for dealing with items/tasks', 'Do everything at once', 'Forget important things', 'Sleep all day'], answer: 'Determine the order for dealing with items/tasks' },
            { word: 'objective', options: ['A thing aimed at or sought; a goal', 'An interesting story', 'A type of person', 'A random event'], answer: 'A thing aimed at or sought; a goal' },
            { word: 'logistics', options: ['The detailed coordination of a complex operation', 'The study of words', 'Simple housework', 'A type of math'], answer: 'The detailed coordination of a complex operation' },
            { word: 'contingency', options: ['A future event or circumstance which is possible but cannot be predicted with certainty', 'A solid plan', 'A past failure', 'A daily habit'], answer: 'A future event or circumstance which is possible but cannot be predicted with certainty' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "I ___ going to start my project this weekend.", options: ["am", "is", "are"], answer: "am" },
            { text: "We need ___ our most important tasks first.", options: ["to prioritize", "prioritizing", "prioritize"], answer: "to prioritize" },
            { text: "What ___ you do if the original plan fails?", options: ["will", "did", "was"], answer: "will" },
            { text: "The logistics ___ being handled by a professional team.", options: ["are", "is", "be"], answer: "are" },
            { text: "Our main objective ___ to raise awareness.", options: ["is", "are", "am"], answer: "is" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "To prioritize is to determine the order for dealing with multiple tasks.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "An 'objective' is a random event that happens by accident.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "A contingency plan is developed to handle possible but uncertain future events.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Coordinating a charity event with a team of volunteers.",
              options: [
                { label: 'A', text: "We need to work hard and do everything that we can for the event." },
                { label: 'B', text: "Let's prioritize our objectives and establish a clear contingency plan." },
                { label: 'C', text: "Planning an event is a complex process that takes a lot of time." }
              ],
              answer: "Let's prioritize our objectives and establish a clear contingency plan."
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ch23',
    number: 23,
    title: 'Sports and Games',
    emoji: '⚽',
    goal: 'Analyze sportsmanship and the importance of physical competition.',
    activities: [
      {
        id: 'act1',
        name: 'Word Match',
        type: 'word-match',
        content: {
          questions: [
            { word: 'sportsmanship', options: ['Fair and generous behavior or treatment of others in a sports contest', 'Winning at any cost', 'A type of ball', 'A sport stadium'], answer: 'Fair and generous behavior or treatment of others in a sports contest' },
            { word: 'strategy', options: ['A plan of action designed to achieve a long-term or overall aim', 'A random guess', 'A physical exercise', 'A type of team'], answer: 'A plan of action designed to achieve a long-term or overall aim' },
            { word: 'opponent', options: ['Someone who competes against or fights another in a contest', 'A teammate', 'A sports coach', 'A fan'], answer: 'Someone who competes against or fights another in a contest' },
            { word: 'persistence', options: ['Firm continuance in a course of action in spite of difficulty', 'Giving up soon', 'A type of sprint', 'A lucky win'], answer: 'Firm continuance in a course of action in spite of difficulty' },
          ]
        }
      },
      {
        id: 'act3',
        name: 'Grammar Builder',
        type: 'grammar-builder',
        content: {
          sentences: [
            { text: "The team ___ their victory after the match.", options: ["celebrated", "celebrate", "celebrating"], answer: "celebrated" },
            { text: "Winning requires both talent ___ hard work.", options: ["and", "but", "or"], answer: "and" },
            { text: "The coach ___ us to never give up.", options: ["advised", "advise", "advising"], answer: "advised" },
            { text: "He is a much ___ player than he was last year.", options: ["better", "well", "best"], answer: "better" },
            { text: "We need a good ___ to beat our opponents.", options: ["strategy", "strategic", "strategizing"], answer: "strategy" }
          ]
        }
      },
      {
        id: 'act6',
        name: 'The Truth Seeker',
        type: 'truth-seeker',
        content: {
          questions: [
            { q: "Sportsmanship involves fair and generous behavior toward opponents.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" },
            { q: "A 'strategy' is a random guess made without any overall plan.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fib" },
            { q: "Persistence is the quality of continuing despite difficulties or opposition.", options: ["It's a Fact", "It's a Fib"], answer: "It's a Fact" }
          ]
        }
      },
      {
        id: 'act7',
        name: 'Scenario Shuffle',
        type: 'scenario-shuffle',
        content: {
          questions: [
            {
              scenario: "Analyzing your team's performance after losing a championship match.",
              options: [
                { label: 'A', text: "We lost the game because the other team was much luckier than us." },
                { label: 'B', text: "Despite the loss, I'm proud of our persistence and overall strategy." },
                { label: 'C', text: "Losing is a part of sports and we should try to do better next year." }
              ],
              answer: "Despite the loss, I'm proud of our persistence and overall strategy."
            }
          ]
        }
      }
    ]
  }
];
