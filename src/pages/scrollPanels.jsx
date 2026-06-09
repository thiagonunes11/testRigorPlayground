import React from "react";
import Layout from "../components/Layout";
import "../styles/scrollPanels.css";

const leftItems = [
  { emoji: "🍎", name: "Apple", fact: "There are over 7,500 varieties of apples grown around the world." },
  { emoji: "🍌", name: "Banana", fact: "Bananas are technically berries, but strawberries are not." },
  { emoji: "🍇", name: "Grape", fact: "Grapes are one of the oldest cultivated fruits, dating back 8,000 years." },
  { emoji: "🍓", name: "Strawberry", fact: "Strawberries are the only fruit with seeds on the outside." },
  { emoji: "🍍", name: "Pineapple", fact: "A pineapple plant produces only one pineapple per year." },
  { emoji: "🥭", name: "Mango", fact: "Mangoes are the most widely consumed fresh fruit in the world." },
  { emoji: "🍑", name: "Peach", fact: "Peaches are native to China and have been cultivated for over 4,000 years." },
  { emoji: "🍒", name: "Cherry", fact: "It takes approximately 250 cherries to make one cherry pie." },
  { emoji: "🫐", name: "Blueberry", fact: "Blueberries are one of the few fruits native to North America." },
  { emoji: "🍋", name: "Lemon", fact: "Lemons contain more sugar than strawberries." },
  { emoji: "🍊", name: "Orange", fact: "Oranges are a hybrid of pomelo and mandarin." },
  { emoji: "🍉", name: "Watermelon", fact: "Watermelons are 92% water — hence the name." },
  { emoji: "🥝", name: "Kiwi", fact: "Kiwi is native to China and was originally called 'Chinese gooseberry'." },
  { emoji: "🫒", name: "Olive", fact: "Olive trees can live for over 1,000 years." },
  { emoji: "🍈", name: "Melon", fact: "Cantaloupes are named after Cantalupo, a papal estate near Rome." },
];

const rightItems = [
  { emoji: "🥦", name: "Broccoli", fact: "Broccoli is a man-made vegetable, cultivated from wild cabbage." },
  { emoji: "🥕", name: "Carrot", fact: "Carrots were originally purple and yellow — not orange." },
  { emoji: "🌽", name: "Corn", fact: "An ear of corn has an even number of rows, always." },
  { emoji: "🍆", name: "Eggplant", fact: "Eggplants are technically fruits — they contain seeds and develop from flowers." },
  { emoji: "🧅", name: "Onion", fact: "Onions were used as currency in the Middle Ages." },
  { emoji: "🍄", name: "Mushroom", fact: "Mushrooms are more closely related to humans than to plants." },
  { emoji: "🥬", name: "Lettuce", fact: "Lettuce was one of the first vegetables grown in space." },
  { emoji: "🌶️", name: "Chili Pepper", fact: "Capsaicin in chili peppers has no effect on birds." },
  { emoji: "🥒", name: "Cucumber", fact: "Cucumbers are 95% water." },
  { emoji: "🧄", name: "Garlic", fact: "Garlic has been used medicinally for over 5,000 years." },
  { emoji: "🫑", name: "Bell Pepper", fact: "Bell peppers are fruits that are botanically related to tomatoes." },
  { emoji: "🥑", name: "Avocado", fact: "Avocados are a single-seeded berry — one of the largest in the world." },
  { emoji: "🥔", name: "Potato", fact: "Potatoes were the first vegetable grown in space in 1995." },
  { emoji: "🥗", name: "Spinach", fact: "Spinach is a flowering plant related to beets and quinoa." },
  { emoji: "🫛", name: "Pea", fact: "Gregor Mendel famously used peas to discover the laws of genetics." },
];

const ScrollPanels = () => {
  return (
    <Layout
      title="Scroll Panels"
      description="Each panel is a fixed-height viewport. Scroll up and down inside each panel to reveal hidden items."
    >
      <div className="scroll-panels-wrapper">

        {/* ── Left Panel ── */}
        <div className="scroll-panel" id="left-panel">
          <div className="scroll-panel-header">
            <span className="scroll-panel-icon">🍏</span>
            <h2 className="scroll-panel-title">Fruits</h2>
            <p className="scroll-panel-subtitle">Scroll to explore each fruit</p>
          </div>

          {/* wrapper applies the bottom-fade hint */}
          <div className="scroll-panel-body-wrapper">
            <div className="scroll-panel-body" id="left-panel-body">
              {leftItems.map((item, index) => (
                <div
                  className="scroll-panel-card"
                  key={index}
                  id={`fruit-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="scroll-card-emoji">{item.emoji}</div>
                  <div className="scroll-card-content">
                    <h3 className="scroll-card-name">{item.name}</h3>
                    <p className="scroll-card-fact">{item.fact}</p>
                  </div>
                  <div className="scroll-card-badge">#{index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-panel-footer">
            <span>{leftItems.length} fruits total — scroll to see all</span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="scroll-panels-divider" aria-hidden="true">
          <div className="divider-line"></div>
          <div className="divider-icon">↕</div>
          <div className="divider-line"></div>
        </div>

        {/* ── Right Panel ── */}
        <div className="scroll-panel" id="right-panel">
          <div className="scroll-panel-header">
            <span className="scroll-panel-icon">🥦</span>
            <h2 className="scroll-panel-title">Vegetables</h2>
            <p className="scroll-panel-subtitle">Scroll to explore each vegetable</p>
          </div>

          <div className="scroll-panel-body-wrapper">
            <div className="scroll-panel-body" id="right-panel-body">
              {rightItems.map((item, index) => (
                <div
                  className="scroll-panel-card"
                  key={index}
                  id={`vegetable-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="scroll-card-emoji">{item.emoji}</div>
                  <div className="scroll-card-content">
                    <h3 className="scroll-card-name">{item.name}</h3>
                    <p className="scroll-card-fact">{item.fact}</p>
                  </div>
                  <div className="scroll-card-badge">#{index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-panel-footer">
            <span>{rightItems.length} vegetables total — scroll to see all</span>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default ScrollPanels;
