import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

// Color scheme based on provided colors
const COLORS = {
  primary: "#537d5c", // Hex: #537d5c - RGB: (83,125,92)
  secondary: "#65665C", // Pantone 417 C - Hex: #65665C - RGB: (101,102,92)
  tertiary: "#5B6770", // Pantone 431 C - Hex: #5B6770 - RGB: (91,103,112)
  accent: "#507F70", // Pantone 625 C - Hex: #507F70 - RGB: (80,127,112)
  highlight: "#5C7E51", // Pantone 2265 C - Hex: #5C7E51 - RGB: (92,126,81)
};

function App() {
  const [activeTab, setActiveTab] = useState("summary");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotional, setSelectedNotional] = useState(100);
  const [depegThreshold, setDepegThreshold] = useState(5);
  const [showOnlyPositiveROI, setShowOnlyPositiveROI] = useState(false);
  const [methodologyExpanded, setMethodologyExpanded] = useState(true);
  const [corkParamsExpanded, setCorkParamsExpanded] = useState(false);

  const [ctAllocation, setCTAllocation] = useState(50);

  const [crossChainData] = useState([
    {
      Date: "2024-11-26",
      Chain: "Arbitrum",
      MintVolume: 0.1,
      BurnVolume: -1.06,
      Depeg: 6.43,
    },
    {
      Date: "2024-11-26",
      Chain: "BSC",
      MintVolume: 1.08,
      BurnVolume: -0.1,
      Depeg: 6.43,
    },
    {
      Date: "2024-11-26",
      Chain: "Bob",
      MintVolume: 0.0,
      BurnVolume: 0.0,
      Depeg: 6.43,
    },
    {
      Date: "2024-11-26",
      Chain: "Ethereum",
      MintVolume: 0.02,
      BurnVolume: 0.0,
      Depeg: 6.43,
    },
    {
      Date: "2024-11-26",
      Chain: "Mantle",
      MintVolume: 0.0,
      BurnVolume: 0.0,
      Depeg: 6.43,
    },
    {
      Date: "2024-11-27",
      Chain: "Arbitrum",
      MintVolume: 0.18,
      BurnVolume: -0.57,
      Depeg: 6.0,
    },
    {
      Date: "2024-11-27",
      Chain: "Ethereum",
      MintVolume: 0.0,
      BurnVolume: -0.17,
      Depeg: 6.0,
    },
    {
      Date: "2024-12-10",
      Chain: "Arbitrum",
      MintVolume: 0.11,
      BurnVolume: -1.21,
      Depeg: 8.49,
    },
    {
      Date: "2024-12-10",
      Chain: "Ethereum",
      MintVolume: 11.07,
      BurnVolume: -0.08,
      Depeg: 8.49,
    },
    {
      Date: "2024-12-10",
      Chain: "Mantle",
      MintVolume: 0.23,
      BurnVolume: -9.2,
      Depeg: 8.49,
    },
    {
      Date: "2024-12-10",
      Chain: "Optimism",
      MintVolume: 0.0,
      BurnVolume: -0.04,
      Depeg: 8.49,
    },
  ]);

  const [riskSignals] = useState([
    {
      date: "2024-11-22",
      description: "Sudden large-scale minting on Ethereum",
      volume: 30.8,
      chain: "Ethereum",
      riskLevel: "High",
      premiumSpike: 63,
      depegRisk: 8.7,
      action: "Increase DS premium rates",
    },
    {
      date: "2024-12-05",
      description: "Rapid increase in burns on Arbitrum",
      volume: -12.3,
      chain: "Arbitrum",
      riskLevel: "Medium",
      premiumSpike: 35,
      depegRisk: 5.2,
      action: "Liquidity injection",
    },
    {
      date: "2024-12-09",
      description: "DS premium spike with no volume changes",
      volume: 2.1,
      chain: "BSC",
      riskLevel: "Medium",
      premiumSpike: 42,
      depegRisk: 6.1,
      action: "Market monitoring",
    },
    {
      date: "2024-12-18",
      description: "Simultaneous burns across chains",
      volume: -8.5,
      chain: "Multiple",
      riskLevel: "High",
      premiumSpike: 58,
      depegRisk: 7.4,
      action: "Emergency liquidity",
    },
  ]);

  const [revenueData] = useState([
    {
      allocation: 10,
      premiumRevenue: 250000,
      retained: 146000,
      paidOut: 104000,
    },
    {
      allocation: 50,
      premiumRevenue: 1250000,
      retained: 730000,
      paidOut: 520000,
    },
    {
      allocation: 100,
      premiumRevenue: 2500000,
      retained: 1460000,
      paidOut: 1040000,
    },
  ]);

  const [strategicOutcomes] = useState([
    {
      scenario: "Peg Stability Enforcement",
      benefit: "Immediate arbitrage and risk hedging",
      impact: "Avg. Depeg Loss Reduced: $724,219 per event",
    },
    {
      scenario: "Cross-Chain Liquidity Optimization",
      benefit: "Reduced reactive liquidity spikes",
      impact: "Mint/Burn Spike Reduction: up to ~90%",
    },
    {
      scenario: "Revenue via Cover Tokens",
      benefit: "Treasury yield via underwriting depeg risk",
      impact: "Potential Premium Revenue: $25k/UniBTC",
    },
    {
      scenario: "Early Depeg Risk Detection",
      benefit: "Predictive risk indicators & proactive responses",
      impact: "Real-time monitoring of mint/burn & premium data",
    },
  ]);

  const COMPLETE_DATA = [
    {
      Date: "2024-11-21",
      "UNIBTC Low Price": 84933.59,
      "BTC Low Price": 90770.82,
      "Observed Depeg (%)": 6.43,
      "Theoretical Loss per 100 UNIBTC": 583722.06,
      "Cork Payout per 100 UNIBTC": 129867.98,
      "Premium Paid Up to Event": 52000.0,
      "Cork Net Protection Benefit": 77867.98,
    },
    {
      Date: "2024-11-24",
      "UNIBTC Low Price": 85800.4,
      "BTC Low Price": 94677.35,
      "Observed Depeg (%)": 9.38,
      "Theoretical Loss per 100 UNIBTC": 887695.8,
      "Cork Payout per 100 UNIBTC": 414309.03,
      "Premium Paid Up to Event": 66500.0,
      "Cork Net Protection Benefit": 347809.03,
    },
    {
      Date: "2024-11-25",
      "UNIBTC Low Price": 85800.4,
      "BTC Low Price": 95407.89,
      "Observed Depeg (%)": 10.07,
      "Theoretical Loss per 100 UNIBTC": 960749.01,
      "Cork Payout per 100 UNIBTC": 483709.58,
      "Premium Paid Up to Event": 125000.0,
      "Cork Net Protection Benefit": 358709.58,
    },
    {
      Date: "2024-12-03",
      "UNIBTC Low Price": 91750.5,
      "BTC Low Price": 99030.89,
      "Observed Depeg (%)": 7.35,
      "Theoretical Loss per 100 UNIBTC": 728039.08,
      "Cork Payout per 100 UNIBTC": 232884.65,
      "Premium Paid Up to Event": 185000.0,
      "Cork Net Protection Benefit": 47884.65,
    },
    {
      Date: "2024-12-04",
      "UNIBTC Low Price": 89265.51,
      "BTC Low Price": 98771.51,
      "Observed Depeg (%)": 9.62,
      "Theoretical Loss per 100 UNIBTC": 950600.53,
      "Cork Payout per 100 UNIBTC": 456742.96,
      "Premium Paid Up to Event": 255000.0,
      "Cork Net Protection Benefit": 201742.96,
    },
    {
      Date: "2024-12-06",
      "UNIBTC Low Price": 88469.6,
      "BTC Low Price": 94321.26,
      "Observed Depeg (%)": 6.2,
      "Theoretical Loss per 100 UNIBTC": 585165.42,
      "Cork Payout per 100 UNIBTC": 113559.12,
      "Premium Paid Up to Event": 165000.0,
      "Cork Net Protection Benefit": -51440.88,
    },
    {
      Date: "2024-12-09",
      "UNIBTC Low Price": 91866.14,
      "BTC Low Price": 99233.28,
      "Observed Depeg (%)": 7.42,
      "Theoretical Loss per 100 UNIBTC": 736713.65,
      "Cork Payout per 100 UNIBTC": 240547.26,
      "Premium Paid Up to Event": 145000.0,
      "Cork Net Protection Benefit": 95547.26,
    },
    {
      Date: "2024-12-10",
      "UNIBTC Low Price": 92637.71,
      "BTC Low Price": 100634.06,
      "Observed Depeg (%)": 7.95,
      "Theoretical Loss per 100 UNIBTC": 799634.32,
      "Cork Payout per 100 UNIBTC": 296464.03,
      "Premium Paid Up to Event": 215000.0,
      "Cork Net Protection Benefit": 81464.03,
    },
    {
      Date: "2024-12-11",
      "UNIBTC Low Price": 92637.71,
      "BTC Low Price": 101227.03,
      "Observed Depeg (%)": 8.49,
      "Theoretical Loss per 100 UNIBTC": 858931.34,
      "Cork Payout per 100 UNIBTC": 352796.2,
      "Premium Paid Up to Event": 245000.0,
      "Cork Net Protection Benefit": 107796.2,
    },
    {
      Date: "2024-12-12",
      "UNIBTC Low Price": 95398.95,
      "BTC Low Price": 103322.98,
      "Observed Depeg (%)": 7.67,
      "Theoretical Loss per 100 UNIBTC": 792403.5,
      "Cork Payout per 100 UNIBTC": 275788.58,
      "Premium Paid Up to Event": 225000.0,
      "Cork Net Protection Benefit": 50788.58,
    },
    {
      Date: "2024-12-13",
      "UNIBTC Low Price": 97291.8,
      "BTC Low Price": 105291.74,
      "Observed Depeg (%)": 7.6,
      "Theoretical Loss per 100 UNIBTC": 799994.25,
      "Cork Payout per 100 UNIBTC": 273535.56,
      "Premium Paid Up to Event": 235000.0,
      "Cork Net Protection Benefit": 38535.56,
    },
    {
      Date: "2024-12-17",
      "UNIBTC Low Price": 90770.7,
      "BTC Low Price": 96426.52,
      "Observed Depeg (%)": 5.87,
      "Theoretical Loss per 100 UNIBTC": 565582.29,
      "Cork Payout per 100 UNIBTC": 83449.69,
      "Premium Paid Up to Event": 145000.0,
      "Cork Net Protection Benefit": -61550.31,
    },
    {
      Date: "2024-12-20",
      "UNIBTC Low Price": 88122.9,
      "BTC Low Price": 93448.01,
      "Observed Depeg (%)": 5.7,
      "Theoretical Loss per 100 UNIBTC": 532511.59,
      "Cork Payout per 100 UNIBTC": 65271.52,
      "Premium Paid Up to Event": 135000.0,
      "Cork Net Protection Benefit": -69728.48,
    },
    {
      Date: "2024-12-29",
      "UNIBTC Low Price": 88996.82,
      "BTC Low Price": 94201.57,
      "Observed Depeg (%)": 5.53,
      "Theoretical Loss per 100 UNIBTC": 520474.74,
      "Cork Payout per 100 UNIBTC": 49466.89,
      "Premium Paid Up to Event": 210938.85,
      "Cork Net Protection Benefit": -161471.96,
    },
    {
      Date: "2024-12-31",
      "UNIBTC Low Price": 91952.26,
      "BTC Low Price": 97562.98,
      "Observed Depeg (%)": 5.75,
      "Theoretical Loss per 100 UNIBTC": 561071.43,
      "Cork Payout per 100 UNIBTC": 73256.55,
      "Premium Paid Up to Event": 94000.0,
      "Cork Net Protection Benefit": -20743.45,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(COMPLETE_DATA);
      setLoading(false);
    }, 500);
  }, []);

  const filteredData = data.filter((row) => {
    if (row["Observed Depeg (%)"] < depegThreshold) {
      return false;
    }

    if (showOnlyPositiveROI && row["Cork Net Protection Benefit"] <= 0) {
      return false;
    }

    return true;
  });

  // Updated styling for currency formatting
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "$0.00";
    try {
      const formattedValue = ((value * selectedNotional) / 100).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );

      return value >= 0
        ? `${formattedValue}`
        : `-${formattedValue.replace("-", "")}`;
    } catch (e) {
      return "$0.00";
    }
  };

  const formatLargeCurrency = (value) => {
    if (value === undefined || value === null) return "$0";
    try {
      const formattedValue = value.toLocaleString("en-US");

      return value >= 0
        ? `${formattedValue}`
        : `-${formattedValue.replace("-", "")}`;
    } catch (e) {
      return "$0";
    }
  };

  const formatPercentage = (value) => {
    if (value === undefined || value === null) return "0.00%";
    try {
      return value.toFixed(2) + "%";
    } catch (e) {
      return "0.00%";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatBTC = (value) => {
    if (value === undefined || value === null) return "0.00 BTC";
    try {
      return (
        value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " BTC"
      );
    } catch (e) {
      return "0.00 BTC";
    }
  };

  const calculateStats = () => {
    if (!filteredData || filteredData.length === 0) {
      return {
        totalDepegDays: 0,
        avgLossPerDepegDay: 0,
        totalPremiumPaid: 0,
        totalPayoutDelivered: 0,
        totalNetBenefit: 0,
      };
    }

    const totalDepegDays = filteredData.length;

    const totalLoss = filteredData.reduce(
      (sum, row) => sum + row["Theoretical Loss per 100 UNIBTC"],
      0
    );
    const avgLossPerDepegDay = totalLoss / totalDepegDays;

    const totalPremiumPaid = filteredData.reduce(
      (sum, row) => sum + row["Premium Paid Up to Event"],
      0
    );

    const totalPayoutDelivered = filteredData.reduce(
      (sum, row) => sum + row["Cork Payout per 100 UNIBTC"],
      0
    );

    const totalNetBenefit = filteredData.reduce(
      (sum, row) => sum + row["Cork Net Protection Benefit"],
      0
    );

    return {
      totalDepegDays,
      avgLossPerDepegDay,
      totalPremiumPaid,
      totalPayoutDelivered,
      totalNetBenefit,
    };
  };

  const calculateRevenue = () => {
    const revenuePerUnit = 25000;
    return {
      premiumRevenue: ctAllocation * revenuePerUnit,
      retained: ctAllocation * revenuePerUnit * 0.584,
      paidOut: ctAllocation * revenuePerUnit * 0.416,
    };
  };

  const stats = calculateStats();
  const revenueStats = calculateRevenue();

  const toggleMethodology = () => {
    setMethodologyExpanded(!methodologyExpanded);
  };

  const toggleCorkParams = () => {
    setCorkParamsExpanded(!corkParamsExpanded);
  };

  // Helper function to get the appropriate color for positive/negative values
  const getValueColor = (value) => {
    if (value > 0) return "#2e7d32"; // Dark green for positive values
    if (value < 0) return "#c62828"; // Dark red for negative values
    return "#666666"; // Neutral gray for zero values
  };

  const TabNavigation = () => {
    return (
      <div className="tabs-navigation">
        <div
          className={`tab ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => setActiveTab("summary")}
          style={{
            backgroundColor:
              activeTab === "summary" ? COLORS.highlight : "transparent",
            color: activeTab === "summary" ? "#ffffff" : "#ffffff",
          }}
        >
          Summary
        </div>
        <div
          className={`tab ${activeTab === "scenario1" ? "active" : ""}`}
          onClick={() => setActiveTab("scenario1")}
          style={{
            backgroundColor:
              activeTab === "scenario1" ? COLORS.highlight : "transparent",
            color: activeTab === "scenario1" ? "#ffffff" : "#ffffff",
          }}
        >
          Scenario 1: Peg Stability
        </div>
        <div
          className={`tab ${activeTab === "scenario2" ? "active" : ""}`}
          onClick={() => setActiveTab("scenario2")}
          style={{
            backgroundColor:
              activeTab === "scenario2" ? COLORS.highlight : "transparent",
            color: activeTab === "scenario2" ? "#ffffff" : "#ffffff",
          }}
        >
          Scenario 2: Cross-Chain Liquidity
        </div>
        <div
          className={`tab ${activeTab === "scenario3" ? "active" : ""}`}
          onClick={() => setActiveTab("scenario3")}
          style={{
            backgroundColor:
              activeTab === "scenario3" ? COLORS.highlight : "transparent",
            color: activeTab === "scenario3" ? "#ffffff" : "#ffffff",
          }}
        >
          Scenario 3: Revenue Generation
        </div>
        <div
          className={`tab ${activeTab === "scenario4" ? "active" : ""}`}
          onClick={() => setActiveTab("scenario4")}
          style={{
            backgroundColor:
              activeTab === "scenario4" ? COLORS.highlight : "transparent",
            color: activeTab === "scenario4" ? "#ffffff" : "#ffffff",
          }}
        >
          Scenario 4: Risk Detection
        </div>
        <div
          className={`tab ${activeTab === "methodology" ? "active" : ""}`}
          onClick={() => setActiveTab("methodology")}
          style={{
            backgroundColor:
              activeTab === "methodology" ? COLORS.highlight : "transparent",
            color: activeTab === "methodology" ? "#ffffff" : "#ffffff",
          }}
        >
          Methodology
        </div>
      </div>
    );
  };

  const renderSummaryTab = () => {
    return (
      <div className="summary-tab">
        <div
          className="filter-panel"
          style={{
            backgroundColor: `${COLORS.secondary}22`,
            borderColor: COLORS.primary,
          }}
        >
          <h3 style={{ color: COLORS.primary }}>Dashboard Purpose</h3>
          <p>
            Evaluate and quantify strategic benefits of integrating UniBTC with
            Cork Protocol, specifically in enhancing peg stability, cross-chain
            liquidity, generating new revenue streams, and enabling proactive
            risk management.
          </p>

          <div className="logo-section">
            <div className="integration-logo">
              <div
                className="unibtc-logo"
                style={{ color: COLORS.highlight, fontWeight: "bold" }}
              >
                UniBTC
              </div>
              <div
                className="benefit-tag"
                style={{ backgroundColor: COLORS.accent, color: "#ffffff" }}
              >
                Strategic Integration
              </div>
            </div>
          </div>
        </div>

        <div
          className="summary-stats-panel"
          style={{
            backgroundColor: `${COLORS.tertiary}15`,
            borderColor: COLORS.tertiary,
          }}
        >
          <h3 style={{ color: COLORS.tertiary }}>Key Strategic Outcomes</h3>
          <table style={{ borderColor: COLORS.tertiary }}>
            <thead>
              <tr
                style={{ backgroundColor: COLORS.tertiary, color: "#ffffff" }}
              >
                <th>Scenario</th>
                <th>Primary Benefit</th>
                <th>Quantified Impact</th>
              </tr>
            </thead>
            <tbody>
              {strategicOutcomes.map((outcome, index) => (
                <tr
                  key={index}
                  className={`scenario-row scenario-${index + 1}`}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? `${COLORS.tertiary}15`
                        : `${COLORS.tertiary}10`,
                    borderBottom: `1px solid ${COLORS.tertiary}30`,
                  }}
                >
                  <td>{outcome.scenario}</td>
                  <td>{outcome.benefit}</td>
                  <td>{outcome.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-grid">
          <div
            className="filter-panel scenario-card"
            onClick={() => setActiveTab("scenario1")}
            style={{
              backgroundColor: `${COLORS.primary}15`,
              borderColor: COLORS.primary,
            }}
          >
            <div
              className="scenario-badge"
              style={{ backgroundColor: COLORS.primary, color: "#ffffff" }}
            >
              1
            </div>
            <h3 style={{ color: COLORS.primary }}>Peg Stability Enforcement</h3>
            <p>
              Quantify the effectiveness of Cork's DS mechanism to stabilize
              UniBTC during historical peg instability.
            </p>
            <div className="key-metric">
              <span className="metric-label">Avg. Loss Reduced:</span>
              <span className="metric-value" style={{ color: COLORS.primary }}>
                $724,219 per event
              </span>
            </div>
            <button
              className="apply-btn"
              style={{ backgroundColor: COLORS.primary, color: "#ffffff" }}
            >
              View Details
            </button>
          </div>

          <div
            className="filter-panel scenario-card"
            onClick={() => setActiveTab("scenario2")}
            style={{
              backgroundColor: `${COLORS.secondary}15`,
              borderColor: COLORS.secondary,
            }}
          >
            <div
              className="scenario-badge"
              style={{ backgroundColor: COLORS.secondary, color: "#ffffff" }}
            >
              2
            </div>
            <h3 style={{ color: COLORS.secondary }}>
              Cross-Chain Liquidity Optimization
            </h3>
            <p>
              Quantify reduction of problematic cross-chain mint/burn spikes
              during severe depeg events.
            </p>
            <div className="key-metric">
              <span className="metric-label">Mint/Burn Reduction:</span>
              <span
                className="metric-value"
                style={{ color: COLORS.secondary }}
              >
                Up to ~90%
              </span>
            </div>
            <button
              className="apply-btn"
              style={{ backgroundColor: COLORS.secondary, color: "#ffffff" }}
            >
              View Details
            </button>
          </div>

          <div
            className="filter-panel scenario-card"
            onClick={() => setActiveTab("scenario3")}
            style={{
              backgroundColor: `${COLORS.tertiary}15`,
              borderColor: COLORS.tertiary,
            }}
          >
            <div
              className="scenario-badge"
              style={{ backgroundColor: COLORS.tertiary, color: "#ffffff" }}
            >
              3
            </div>
            <h3 style={{ color: COLORS.tertiary }}>
              Revenue Generation via Cover Tokens
            </h3>
            <p>
              Illustrate potential issuer revenue generation by underwriting
              UniBTC peg risk through Cork's Cover Tokens.
            </p>
            <div className="key-metric">
              <span className="metric-label">Premium Revenue:</span>
              <span className="metric-value" style={{ color: COLORS.tertiary }}>
                $25k per UniBTC
              </span>
            </div>
            <button
              className="apply-btn"
              style={{ backgroundColor: COLORS.tertiary, color: "#ffffff" }}
            >
              View Details
            </button>
          </div>

          <div
            className="filter-panel scenario-card"
            onClick={() => setActiveTab("scenario4")}
            style={{
              backgroundColor: `${COLORS.accent}15`,
              borderColor: COLORS.accent,
            }}
          >
            <div
              className="scenario-badge"
              style={{ backgroundColor: COLORS.accent, color: "#ffffff" }}
            >
              4
            </div>
            <h3 style={{ color: COLORS.accent }}>Early Depeg Risk Detection</h3>
            <p>
              Provide predictive monitoring based on mint/burn anomalies and DS
              premium spikes.
            </p>
            <div className="key-metric">
              <span className="metric-label">Benefit:</span>
              <span className="metric-value" style={{ color: COLORS.accent }}>
                Proactive Risk Management
              </span>
            </div>
            <button
              className="apply-btn"
              style={{ backgroundColor: COLORS.accent, color: "#ffffff" }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Placeholder functions for other tabs
  const renderScenario1Tab = () => {
    return (
      <div className="scenario1-tab">
        <div className="filter-panel">
          <h3>Scenario 1: Peg Stability Enforcement via Depeg Swaps (DS)</h3>
          <p className="scenario-objective">
            <strong>Objective:</strong> Model historical UniBTC peg deviations
            (Nov–Dec 2024) and quantify savings had Cork's Depeg Swap (DS)
            hedging mechanism been implemented.
          </p>
        </div>
        <div className="placeholder-chart">
          <p>Scenario 1 content will be implemented here.</p>
        </div>
      </div>
    );
  };

  const renderScenario2Tab = () => {
    return (
      <div className="scenario2-tab">
        <div className="filter-panel">
          <h3>Scenario 2: Cross-Chain Liquidity Optimization</h3>
          <p className="scenario-objective">
            <strong>Objective:</strong> Quantify reduction of problematic
            cross-chain mint/burn spikes during severe depeg events by
            implementing Cork's DS mechanism across multiple chains.
          </p>
        </div>
        <div className="placeholder-chart">
          <p>Scenario 2 content will be implemented here.</p>
        </div>
      </div>
    );
  };

  const renderScenario3Tab = () => {
    return (
