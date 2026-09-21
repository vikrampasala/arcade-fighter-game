# Arcade Fighter 2D 🕹️

A responsive **2D Arcade Fighting Game** engineered with vanilla JavaScript, CSS3 variables, and an HTML5 Canvas loop. This build implements character state mutations, active proximity proximity detection arrays, custom structural game mechanics, and dynamic DOM interface updates using `classList` toggling.

---

## 🚀 Architectural Mechanics

*   **Proximity Combat Mathematics:** Deprecates overlapping axis calculations in favor of an efficient, real-world horizontal proximity check (`Math.abs(p1.x - p2.x) <= 95`) to immediately process localized strikes.
*   **Dynamic Visual State Shifts:** Mutates sprite entities upon zero-health calculation. Defeated fighters completely alter their engine height matrices, instantly turning into static gray headstones (`#4b4d52`) on the game floor while locking engine movements.
*   **Bulletproof DOM Management:** Integrates smooth opacity transformations by using class array modifiers (`.classList.add('active')` and `.classList.remove('active')`) to cleanly render the centralized Game Over screen.
*   **Energy Beam Strikes:** Triggers temporary width expansions on attack vectors (`this.width + 50`) that deal a massive **20 damage points** per successful connection.

---

## 🎮 Battle Controls

The movement keys and attack inputs are cleanly divided across two operational layout clusters on a single local keyboard interface.

### 🔴 Player 1 Controls (Neon Pink)
*   `A` / `D` — Run Left / Right (Speed Coefficient: `6`)
*   `W` — Jump *(Allowed only when resting flat on the canvas floor)*
*   `J` — Energy Beam Strike *(Deals 20 DMG)*

### 🔵 Player 2 Controls (Neon Cyan)
*   `◀` / `▶` — Run Left / Right (Speed Coefficient: `6`)
*   `▲` — Jump *(Allowed only when resting flat on the canvas floor)*
*   `K` — Energy Beam Strike *(Deals 20 DMG)*

---

## 📋 Technical Core Specifications

| Variable | Engine Parameter Setting | Intent & Function |
| :--- | :--- | :--- |
| **`GRAVITY`** | `0.6` | Downward constant acceleration factor added to vertical vectors per frame. |
| **`CANVAS_SIZE`** | `1024` x `576` | Fixed resolution rendering landscape constraint box. |
| **`BASE_DAMAGE`** | `20` | Health deduction value removed from enemy structural pools upon impact. |
| **`ROUND_LIMIT`** | `99` seconds | Global timer limit triggers a structural "TIME OUT" state at zero. |

---

## 📦 Local Installation & Deployment

Because this application runs entirely on client-side browser loops, you do not need to manage heavy build tools or runtime server dependencies.

1.  **Clone the Source Repository**
    ```bash
    git clone https://github.com
    cd arcade-fighter-2d
    ```
2.  **Verify Project Directory Layout**
    ```text
    ├── fight.html       # Structural layout nodes & dynamic viewports
    ├── stylez.css       # Layout styles, gradient health-fills, & screen states
    └── game.js          # Main engine architecture, custom physics classes, & loops
    ```
3.  **Boot the Engine**
    *   Double-click `fight.html` to instantly run the file inside any modern desktop web browser, or
    *   Right-click `fight.html` inside VS Code and select **Open with Live Server** for a seamless testing environment.
