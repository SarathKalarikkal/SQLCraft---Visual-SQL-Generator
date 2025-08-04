import { useNavigate } from "react-router-dom";
import "./Login.css";

const floatingTexts = [
  "SELECT * FROM users;",
  "INSERT INTO orders VALUES (...);",
  "UPDATE customers SET name = 'John';",
  "DELETE FROM logs WHERE date < NOW();",
  "CREATE TABLE invoices (...);",
  "JOIN orders ON users.id = orders.user_id;",
  "WHERE status = 'active';",
  "ALTER TABLE products ADD COLUMN stock INT;",
  "DROP TABLE temp_users;",
  "TRUNCATE TABLE sessions;",
  "SELECT COUNT(*) FROM orders;",
  "CREATE INDEX idx_email ON users(email);",
  "UPDATE employees SET salary = salary * 1.1;",
  "DELETE FROM sessions WHERE expired = TRUE;",
  "SELECT name, age FROM users WHERE age > 25;",
  "SELECT DISTINCT department FROM employees;",
  "RENAME TABLE old_users TO archived_users;",
  "GRANT SELECT ON database.* TO 'user'@'localhost';",
  "REVOKE INSERT ON orders FROM 'guest'@'%';",
  "SELECT u.name, o.amount FROM users u JOIN orders o ON u.id = o.user_id;",
  "CREATE VIEW active_users AS SELECT * FROM users WHERE active = 1;",
  "ALTER TABLE orders DROP COLUMN temp_flag;",
  "SELECT * FROM logs ORDER BY created_at DESC;",
  "INSERT INTO audit_log (event, user_id) VALUES ('login', 123);",
  "SELECT * FROM products WHERE name LIKE '%Phone%';",
  "WITH recent_orders AS (SELECT * FROM orders ORDER BY date DESC LIMIT 10) SELECT * FROM recent_orders;",
  "BEGIN TRANSACTION;",
  "COMMIT;",
  "ROLLBACK;",
  "SHOW TABLES;",
  "DESCRIBE users;",
  "SELECT CURRENT_TIMESTAMP;",
  "CREATE TRIGGER update_time BEFORE UPDATE ON users FOR EACH ROW SET NEW.updated_at = NOW();",
  "SELECT * FROM payments WHERE amount BETWEEN 100 AND 500;",
  "SELECT email FROM users WHERE email IS NOT NULL;",
  "SELECT department, AVG(salary) FROM employees GROUP BY department;",
];

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/main/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0e1a24] px-4 relative overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Floating SQL Queries */}
   <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
  {floatingTexts.map((text, i) => {
    const left = (i * 10 + Math.random() * 5) % 100;
    const duration = (9 + Math.random() * 4).toFixed(2);
    const fontSize = `${12 + Math.random() * 6}px`;
    const opacity = (0.25 + Math.random() * 0.5).toFixed(2);

    return (
      <span
        key={i}
        className="absolute text-[#79c9ff] font-mono animate-float floating-text whitespace-nowrap"
        style={{
          top: `100%`,
          left: `${left}%`,
          fontSize,
          animationDuration: `${duration}s`,
          opacity
        }}
      >
        {text}
      </span>
    );
  })}
</div>



      {/* Login Card */}
      <div className="w-full max-w-md bg-[#152535] rounded-2xl p-8 shadow-xl z-10 backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="text-white text-xl font-bold tracking-tight">
            Data Weaver
          </div>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-[#9bb1c9] text-sm text-center mb-6">
          Login to continue
        </p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-lg bg-[#223649] text-white placeholder-[#90adcb] focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 rounded-lg bg-[#223649] text-white placeholder-[#90adcb] focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all"
          />
        </div>

        <div className="text-right mb-6">
          <button className="text-sm text-[#90adcb] underline hover:text-white transition">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-[#0c7ff2] text-white font-semibold rounded-lg hover:bg-[#0a6bd1] transition"
          onClick={submitHandler}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
