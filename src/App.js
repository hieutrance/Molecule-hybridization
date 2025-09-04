import React, { useState } from "react";

function App() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Database mở rộng
  const rules = {
    CH4: { hybrid: "sp³", angle: "109.5°", shape: "Tetrahedral" },
    NH3: { hybrid: "sp³", angle: "107°", shape: "Trigonal pyramidal" },
    H2O: { hybrid: "sp³", angle: "104.5°", shape: "Bent" },
    C2H2: { hybrid: "sp", angle: "180°", shape: "Linear" },
    C2H4: { hybrid: "sp²", angle: "120°", shape: "Trigonal planar" },
    CO2: { hybrid: "sp", angle: "180°", shape: "Linear" },
    BF3: { hybrid: "sp²", angle: "120°", shape: "Trigonal planar" },
    SO2: { hybrid: "sp²", angle: "~119°", shape: "Bent" },
    SO3: { hybrid: "sp²", angle: "120°", shape: "Trigonal planar" },
    XEF2: { hybrid: "sp³d", angle: "180°", shape: "Linear" },
    PCL5: { hybrid: "sp³d", angle: "120° & 90°", shape: "Trigonal bipyramidal" },
    SF6: { hybrid: "sp³d²", angle: "90°", shape: "Octahedral" },
  };

  // Hàm dự đoán
  const predictHybridization = (input) => {
    const mol = input.toUpperCase().trim();
    if (rules[mol]) {
      const info = rules[mol];
      return `Hybridization: ${info.hybrid}, Bond angle: ${info.angle}, Shape: ${info.shape}`;
    }
    return "❌ Sorry, this molecule is not in the demo database.";
  };

  // Khi người dùng gõ, đưa gợi ý
  const handleChange = (e) => {
    const value = e.target.value;
    setFormula(value);

    if (value.length > 0) {
      const filtered = Object.keys(rules).filter((key) =>
        key.startsWith(value.toUpperCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Khi chọn gợi ý
  const handleSuggestionClick = (val) => {
    setFormula(val);
    setSuggestions([]);
  };

  const handleCalculate = () => {
    setResult(predictHybridization(formula));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          width: "450px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333" }}>🔬 Hybridization Predictor</h1>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Enter a molecule formula (try: CH4, CO2, SF6…)
        </p>

        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={formula}
            onChange={handleChange}
            placeholder="Enter formula..."
            style={{
              padding: "10px",
              width: "80%",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          {/* Box gợi ý */}
          {suggestions.length > 0 && (
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                margin: "5px auto",
                width: "80%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
              }}
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#f2f2f2")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#fff")
                  }
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleCalculate}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#45a049")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#4CAF50")
          }
        >
          Calculate
        </button>

        <p
          style={{
            marginTop: "25px",
            fontSize: "18px",
            fontWeight: "bold",
            color: result.startsWith("❌") ? "red" : "#333",
          }}
        >
          {result}
        </p>
      </div>
    </div>
  );
}

export default App;
