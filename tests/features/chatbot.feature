Feature: Chatbot Account Software Testing
  In order to validate chatbot functionality
  As a tester
  I want to test all question types, history access, and copying responses

  Rule: Predefined questions should trigger correct responses
  Scenario Outline: User clicks a predefined question button
    Given the chatbot page is opened
    When the user clicks the prepared question button "<question>"
    Then the chatbot should display the correct answer
    And the question should be saved in chat history

    Examples:
      | question                                      |
      | سلام چطوری میتوانم یک فاکتور جدید صادر کنم ؟ |
      | رمز عبورم رو فراموش کردم و باید چیکار کنم ؟ |
      | میتونم گزارش فروش ماه قبل رو ببینم ؟       |
      
  Rule: Typed questions that exactly match predefined replies
    Scenario Outline: User types an exact question
      Given the chatbot page is opened
      When the user types "<question>"
      And the user clicks "Send"
      Then the chatbot should display the correct answer
      And the question should be saved in chat history

      Examples:
        | question                                      |
        | سلام چطوری میتوانم یک فاکتور جدید صادر کنم ؟ |
        | رمز عبورم رو فراموش کردم و باید چیکار کنم ؟ |
        | میتونم گزارش فروش ماه قبل رو ببینم ؟       |

  Rule: Typed questions that match keywords
    Scenario Outline: User types a question containing keywords
      Given the chatbot page is opened
      When the user types "<keyword_question>"
      And the user clicks "Send"
      Then the chatbot should display the correct answer
      And the question should be saved in chat history

      Examples:
        | keyword_question |
        | فاکتور جدید       |
        | گزارش فروش        |
        | تهیه بکاپ          |

  Rule: Questions that are incomplete, gibberish, or unrelated
    Scenario Outline: User types a malformed or unrelated question
      Given the chatbot page is opened
      When the user types "<irrelevant_question>"
      And the user clicks "Send"
      Then the chatbot should display "متاسفانه متوجه سوال شما نشدم. لطفاً سوال خود را دربارهٔ «فاکتورها»، «گزارش‌ها»، «پشتیبان‌گیری» یا «مدیریت کاربران» مطرح کنید."
      And the question should be saved in chat history

      Examples:
        | irrelevant_question |
        | چطوری....           |
        | ?????               |
        | اخبار فوتبال امروز  |
        | آب و هوا امروز      |

  Rule: All user questions should be saved in chat history
    Scenario: Chat history should record all user messages
      Given the chatbot page is opened
      When the user asks multiple questions:
        | سوال                                      |
        | سلام چطوری میتوانم یک فاکتور جدید صادر کنم ؟ |
        | فاکتور جدید                                |
        | تحلیل فروش سه ماه گذشته                    |
        | اخبار فوتبال امروز                        |
      Then chat history should contain 4 messages

  Rule: User can copy chatbot responses
    Scenario Outline: Copy chatbot response
      Given the chatbot page is opened
      When the user types "<question>"
      And the user clicks "Send"
      And the user clicks "Copy Response"
      Then the response should be available in the clipboard

      Examples:
        | question                                |
        | سلام چطوری میتوانم یک فاکتور جدید صادر کنم ؟ |
        | تهیه نسخه پشتیبان                        |

  Rule: User can delete a specific chat from history
    Scenario Outline: Delete a chat from chat history
      Given the chatbot page is opened
      And the user has previous chat history
      When the user clicks the "Delete" button next to "<chat_question>"
      Then the chat "<chat_question>" should no longer be visible in history

      Examples:
        | chat_question                           |
        | فاکتور جدید                               |

  Rule: User can scroll to the first chat in history
    Scenario Outline: Scroll to first chat
      Given the chatbot page is opened
      And the user has multiple chats in history
      When the user scrolls to the top of chat history
      Then the first chat "<first_chat>" should be visible

      Examples:
        | first_chat                              |
        | سلام چطوری میتوانم یک فاکتور جدید صادر کنم ؟ |
