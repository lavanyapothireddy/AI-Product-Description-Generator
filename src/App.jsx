import { useState, useRef } from "react";

const TONES = ["Professional", "Playful", "Luxury", "Minimalist", "Bold & Punchy"];
const LENGTHS = ["Short (1–2 sentences)", "Medium (1 paragraph)", "Long (2–3 paragraphs)"];
const PLATFORMS = ["E-commerce (Amazon/Shopify)", "Social Media (Instagram/TikTok)", "Landing Page", "Email Campaign", "App Store"];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    color: #f0ede8;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
  .orb {
    position: absolute; border-radius: 50%;
    filter: blur(100px); opacity: 0.18;
    animation: drift 12s ease-in-out infinite alternate;
  }
  .orb1 { width: 500px; height: 500px; background: #e8632a; top: -100px; left: -150px; animation-delay: 0s; }
  .orb2 { width: 400px; height: 400px; background: #a259f7; bottom: 0; right: -100px; animation-delay: -5s; }
  .orb3 { width: 300px; height: 300px; background: #2af0c8; top: 50%; left: 50%; animation-delay: -3s; }

  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(40px, 30px) scale(1.1); }
  }

  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    position: relative; z-index: 1;
  }

  .header { text-align: center; margin-bottom: 52px; }

  .badge {
    display: inline-block;
    background: rgba(232,99,42,0.15);
    border: 1px solid rgba(232,99,42,0.4);
    color: #e8632a;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 20px;
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
  }

  h1 span {
    background: linear-gradient(135deg, #e8632a, #f7a259);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #888;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto;
  }

  .card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 20px;
    backdrop-filter: blur(12px);
    transition: border-color 0.3s;
  }
  .card:hover { border-color: rgba(232,99,42,0.25); }

  .section-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #e8632a;
    margin-bottom: 14px;
  }

  .input-group { margin-bottom: 20px; }

  label {
    display: block;
    font-size: 0.82rem;
    font-weight: 500;
    color: #bbb;
    margin-bottom: 8px;
    letter-spacing: 0.01em;
  }

  input[type="text"], textarea {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 13px 16px;
    color: #f0ede8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
  }
  input[type="text"]:focus, textarea:focus {
    border-color: #e8632a;
    background: rgba(232,99,42,0.06);
    box-shadow: 0 0 0 3px rgba(232,99,42,0.1);
  }

  textarea { resize: vertical; min-height: 100px; }

  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 580px) { .row { grid-template-columns: 1fr; } }

  .pill-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; }

  .pill {
    padding: 7px 16px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #aaa;
    font-size: 0.82rem;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 400;
  }
  .pill:hover { border-color: rgba(232,99,42,0.4); color: #f0ede8; }
  .pill.active {
    background: rgba(232,99,42,0.18);
    border-color: #e8632a;
    color: #e8632a;
    font-weight: 500;
  }

  .generate-btn {
    width: 100%;
    padding: 17px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #e8632a, #f7a259);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 30px rgba(232,99,42,0.35);
    margin-top: 4px;
  }
  .generate-btn:hover:not(:disabled) {
    opacity: 0.92; transform: translateY(-2px);
    box-shadow: 0 14px 40px rgba(232,99,42,0.45);
  }
  .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .result-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(232,99,42,0.25);
    border-radius: 20px;
    padding: 32px;
    margin-top: 24px;
    animation: slideUp 0.4s ease-out;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap; gap: 10px;
  }

  .result-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #e8632a;
  }

  .result-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  .action-btn {
    padding: 7px 16px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    color: #ccc;
    font-size: 0.8rem;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }
  .action-btn:hover { border-color: #e8632a; color: #e8632a; background: rgba(232,99,42,0.08); }
  .action-btn.copied { border-color: #2af0c8; color: #2af0c8; background: rgba(42,240,200,0.08); }

  .result-text {
    font-size: 1rem;
    line-height: 1.75;
    color: #e0ddd8;
    font-weight: 300;
    white-space: pre-wrap;
  }

  .loading-dots { display: inline-flex; gap: 5px; align-items: center; padding: 8px 0; }
  .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #e8632a;
    animation: bounce 1.2s infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-10px); opacity: 1; }
  }

  .error-msg {
    color: #f7706a;
    font-size: 0.88rem;
    margin-top: 12px;
    padding: 12px 16px;
    background: rgba(247,112,106,0.08);
    border: 1px solid rgba(247,112,106,0.2);
    border-radius: 10px;
  }

  .char-hint { font-size: 0.75rem; color: #555; margin-top: 5px; text-align: right; }
`;

export default function App() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium (1 paragraph)");
  const [platform, setPlatform] = useState("E-commerce (Amazon/Shopify)");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  const buildPrompt = () => {
    return `You are an expert copywriter specializing in product marketing. Generate a compelling product description with the following details:

Product Name: ${productName}
Category: ${category || "Not specified"}
Key Features / USPs: ${features}
Target Audience: ${audience || "General consumers"}
Tone: ${tone}
Length: ${length}
Platform: ${platform}
SEO Keywords to include (naturally): ${keywords || "None"}

Instructions:
- Write ONLY the product description, no preamble or commentary.
- Match the tone precisely: ${tone.toLowerCase()}.
- Optimize for ${platform}.
- Naturally weave in the keywords if provided.
- Make it persuasive, benefit-focused, and conversion-oriented.`;
  };

  const generate = async () => {
    if (!productName.trim() || !features.trim()) {
      setError("Please fill in at least the Product Name and Key Features.");
      return;
    }
    setError("");
    setResult("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error?.message || "API error");
      }

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      setResult(text.trim());
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError("Something went wrong: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="bg-orbs">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>

        <div className="container">
          <div className="header">
            <div className="badge">⚡ AI-Powered</div>
            <h1>Product Description<br /><span>Generator</span></h1>
            <p className="subtitle">
              Fill in your product details and get conversion-ready copy — tailored to your tone, audience, and platform.
            </p>
          </div>

          <div className="card">
            <div className="section-label">01 — Product Info</div>
            <div className="row">
              <div className="input-group">
                <label>Product Name *</label>
                <input type="text" placeholder="e.g. HydroFlask 32oz" value={productName} onChange={(e) => setProductName(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Category</label>
                <input type="text" placeholder="e.g. Fitness, Electronics, Beauty" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
            </div>
            <div className="input-group">
              <label>Key Features & USPs *</label>
              <textarea placeholder="e.g. Double-wall vacuum insulation, keeps drinks cold 24h, BPA-free, 6 colors..." value={features} onChange={(e) => setFeatures(e.target.value)} />
              <div className="char-hint">{features.length} chars</div>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Target Audience</label>
              <input type="text" placeholder="e.g. Fitness enthusiasts aged 20–35" value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
          </div>

          <div className="card">
            <div className="section-label">02 — Writing Style</div>
            <div className="input-group">
              <label>Tone</label>
              <div className="pill-group">
                {TONES.map((t) => (
                  <button key={t} className={`pill ${tone === t ? "active" : ""}`} onClick={() => setTone(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Description Length</label>
              <div className="pill-group">
                {LENGTHS.map((l) => (
                  <button key={l} className={`pill ${length === l ? "active" : ""}`} onClick={() => setLength(l)}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-label">03 — Platform & SEO</div>
            <div className="input-group">
              <label>Target Platform</label>
              <div className="pill-group">
                {PLATFORMS.map((p) => (
                  <button key={p} className={`pill ${platform === p ? "active" : ""}`} onClick={() => setPlatform(p)}>{p}</button>
                ))}
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>SEO Keywords <span style={{ color: "#555", fontWeight: 300 }}>(optional, comma-separated)</span></label>
              <input type="text" placeholder="e.g. insulated water bottle, stainless steel, eco-friendly" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
          </div>

          <button className="generate-btn" onClick={generate} disabled={loading}>
            {loading ? "Generating..." : "✦ Generate Description"}
          </button>

          {error && <div className="error-msg">⚠ {error}</div>}

          {(loading || result) && (
            <div className="result-card" ref={resultRef}>
              <div className="result-header">
                <div className="result-title">✦ Generated Description</div>
                {result && (
                  <div className="result-actions">
                    <button className={`action-btn ${copied ? "copied" : ""}`} onClick={copy}>
                      {copied ? "✓ Copied!" : "Copy"}
                    </button>
                    <button className="action-btn" onClick={generate}>↻ Regenerate</button>
                  </div>
                )}
              </div>
              {loading ? (
                <div className="loading-dots">
                  <div className="dot" /><div className="dot" /><div className="dot" />
                </div>
              ) : (
                <div className="result-text">{result}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
