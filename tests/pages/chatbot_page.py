# -*- coding: utf-8 -*-
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ChatbotPage:
    URL = "http://localhost:5173"

    # -------------------------------
    # Locators
    # -------------------------------
    CHAT_INPUT = (By.ID, "chat-input")
    SEND_BUTTON = (By.ID, "send-button")

    # Multiple chat outputs exist — class selector is correct
    CHAT_OUTPUT = (By.CSS_SELECTOR, ".chat-output:last-of-type")

    VIEW_HISTORY_BTN = (By.CSS_SELECTOR, "header a[href='/all-chats']")
    CHAT_HISTORY_DIV = (By.CLASS_NAME, "main-all-chats")

    # Each chat item in history (container)
    CHAT_ITEM = (By.CLASS_NAME, "chat-item")

    # Buttons inside each chat item
    DELETE_BUTTON = (By.CLASS_NAME, "delete-btn")
    COPY_BUTTON = (By.CLASS_NAME, "copy-btn")

    # Predefined question buttons mapping (to be filled with actual IDs)
    PREDEFINED_BUTTONS = {
        # Example:
        # "What is your name?": "predefined-q1",
        # "Tell me a joke": "predefined-q2",
    }

    # -------------------------------
    # Methods
    # -------------------------------
    def __init__(self, driver):
        self.driver = driver

    def open(self):
        """Open the chatbot page."""
        self.driver.get(self.URL)

    # -------------------------------
    # Main Actions
    # -------------------------------
    def click_predefined_question(self, question):
        """Click one of the predefined question buttons."""
        button_id = self.PREDEFINED_BUTTONS.get(question)
        if not button_id:
            raise ValueError(f"No button ID mapped for question: {question}")
        self.driver.find_element(By.ID, button_id).click()

    def click_follow_up_by_text(self, text):
        """Click a follow-up button by its visible text."""
        buttons = self.driver.find_elements(By.CLASS_NAME, "follow-up")
        for btn in buttons:
            if btn.text.strip() == text:
                btn.click()
                return
        raise Exception(f"Follow-up button '{text}' not found.")

    def type_and_send(self, question):
        """Type a message and click Send."""
        input_box = self.driver.find_element(*self.CHAT_INPUT)
        input_box.clear()
        input_box.send_keys(question)
        self.driver.find_element(*self.SEND_BUTTON).click()

    def click_view_history(self):
        """Open chat history view."""
        self.driver.find_element(*self.VIEW_HISTORY_BTN).click()

    def click_copy_response(self):
        copy_buttons = self.driver.find_elements(*self.COPY_BUTTON)
        if not copy_buttons:
            raise Exception("No Copy Response button found.")
        # Click the last one (most recent bot message)
        copy_buttons[-1].click()

    def delete_chat(self, chat_text, timeout=5):
        """Click delete button next to a specific chat text and wait for it to disappear."""
        chats = self.driver.find_elements(*self.CHAT_ITEM)
        target_chat = None
        for chat in chats:
            if chat_text in chat.text:
                target_chat = chat
                delete_btn = chat.find_element(*self.DELETE_BUTTON)
                delete_btn.click()
                break
        else:
            raise Exception(f"Chat '{chat_text}' not found for deletion.")

        # Wait until this specific chat element is removed from DOM
        WebDriverWait(self.driver, timeout).until_not(
            lambda d: target_chat in d.find_elements(*self.CHAT_ITEM)
        )

    def scroll_to_first_chat(self):
        """Scroll to the top of chat history."""
        chats = self.driver.find_elements(*self.CHAT_ITEM)
        if not chats:
            raise Exception("No chats found to scroll to.")
        first_chat = chats[0]
        self.driver.execute_script("arguments[0].scrollIntoView(true);", first_chat)

    # -------------------------------
    # Data Access Methods
    # -------------------------------
    def get_output_text(self):
        bot_messages = self.driver.find_elements(By.CSS_SELECTOR, ".chat-message-bot .chat-output")
        return bot_messages[-1].text.strip()

    def get_history_text(self, timeout=10):
        WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located(self.CHAT_ITEM)
        )
        return self.driver.find_element(*self.CHAT_HISTORY_DIV).text.strip()

    def get_all_chat_texts(self):
        """Return all chats (question-answer pairs) from history."""
        history_div = self.driver.find_element(*self.CHAT_HISTORY_DIV)
        return history_div.text.split("\n")
