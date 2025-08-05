// Mock data for the interview question bank application
export const questions = [{
  id: 1,
  title: "Explain React hooks lifecycle",
  category: "Frontend",
  subCategory: "React",
  difficulty: 3,
  lastReviewed: "2023-10-15",
  dateAdded: "2023-09-01",
  tags: ["react", "hooks", "lifecycle", "frontend"],
  question: "Explain the lifecycle of React hooks and how they compare to traditional class component lifecycle methods.",
  answer: `React Hooks don't follow the same lifecycle as class components, but they provide similar functionality.
\`useEffect\` replaces several lifecycle methods:
\`\`\`javascript
// Similar to componentDidMount
useEffect(() => {
  // Run once after initial render
}, []);
// Similar to componentDidUpdate
useEffect(() => {
  // Run after every render when dependencies change
}, [dependency1, dependency2]);
// Similar to componentWillUnmount
useEffect(() => {
  // Setup code
  return () => {
    // Cleanup code runs before component unmounts
  };
}, []);
\`\`\`
Other hooks like \`useState\` replace \`this.state\` and \`this.setState\`, while \`useContext\` simplifies context consumption.`,
  mastered: false,
  relatedQuestions: [2, 5, 8]
}, {
  id: 2,
  title: "Implement a binary search algorithm",
  category: "Algorithms",
  subCategory: "Searching",
  difficulty: 2,
  lastReviewed: "2023-10-20",
  dateAdded: "2023-08-15",
  tags: ["algorithms", "binary search", "searching"],
  question: "Implement a binary search algorithm in JavaScript. What is its time complexity?",
  answer: `Binary search finds an element in a sorted array by repeatedly dividing the search interval in half.
\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // Found the target
    }
    if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half
    } else {
      right = mid - 1; // Target is in the left half
    }
  }
  return -1; // Target not found
}
\`\`\`
Time complexity: O(log n) - because the search space is halved in each step.
Space complexity: O(1) - uses constant extra space.`,
  mastered: true,
  relatedQuestions: [3, 7]
}, {
  id: 3,
  title: "Explain database normalization",
  category: "Databases",
  subCategory: "SQL",
  difficulty: 3,
  lastReviewed: "2023-09-28",
  dateAdded: "2023-07-10",
  tags: ["databases", "sql", "normalization"],
  question: "What is database normalization and explain the first three normal forms with examples.",
  answer: `Database normalization is the process of structuring a database to reduce data redundancy and improve data integrity.
1. First Normal Form (1NF):
   - Each table cell should contain a single value
   - Each record needs to be unique
   Example: Converting a table with multiple phone numbers in one cell to separate rows.
2. Second Normal Form (2NF):
   - Table must be in 1NF
   - All non-key attributes must depend on the entire primary key
   Example: Separating order items from customer data.
3. Third Normal Form (3NF):
   - Table must be in 2NF
   - No transitive dependencies (non-key columns depend on other non-key columns)
   Example: Moving city and state to a separate table from customer addresses.`,
  mastered: false,
  relatedQuestions: [9, 12]
}, {
  id: 4,
  title: "Explain how Spring Boot dependency injection works",
  category: "Backend",
  subCategory: "Spring Boot",
  difficulty: 3,
  lastReviewed: "2023-10-12",
  dateAdded: "2023-08-05",
  tags: ["java", "spring", "dependency injection", "backend"],
  question: "Explain how dependency injection works in Spring Boot and the different ways to implement it.",
  answer: `Spring Boot's dependency injection is based on the Inversion of Control (IoC) principle where the framework manages object creation and lifecycle.
There are three main types of dependency injection in Spring:
1. Constructor Injection (preferred):
\`\`\`java
@Service
public class UserService {
    private final UserRepository userRepository;
    @Autowired // optional in newer Spring versions
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
\`\`\`
2. Setter Injection:
\`\`\`java
@Service
public class UserService {
    private UserRepository userRepository;
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
\`\`\`
3. Field Injection (not recommended for production):
\`\`\`java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
\`\`\`
Spring uses annotations like @Component, @Service, @Repository, and @Controller to identify beans for injection.`,
  mastered: true,
  relatedQuestions: [11, 15]
}, {
  id: 5,
  title: "Implement a debounce function",
  category: "Frontend",
  subCategory: "JavaScript",
  difficulty: 2,
  lastReviewed: "2023-10-25",
  dateAdded: "2023-09-15",
  tags: ["javascript", "frontend", "optimization"],
  question: "Implement a debounce function in JavaScript and explain its use cases.",
  answer: `A debounce function limits how often a function can be called, typically used for performance optimization.
\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
// Example usage
const handleSearch = debounce((searchTerm) => {
  // API call or expensive operation
  console.log('Searching for:', searchTerm);
}, 300);
// Call this on input change
searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
\`\`\`
Common use cases:
1. Search input (prevent API calls on every keystroke)
2. Window resize handlers
3. Button click handlers (prevent double submissions)
4. Scroll event handlers`,
  mastered: false,
  relatedQuestions: [1, 6]
}, {
  id: 6,
  title: "Explain event loop in JavaScript",
  category: "Frontend",
  subCategory: "JavaScript",
  difficulty: 3,
  lastReviewed: "2023-09-30",
  dateAdded: "2023-07-22",
  tags: ["javascript", "event loop", "asynchronous"],
  question: "Explain the JavaScript event loop and how asynchronous operations work in the browser.",
  answer: `The JavaScript event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.
Key components:
1. Call Stack: Where synchronous code execution happens
2. Web APIs: Where asynchronous operations (setTimeout, fetch, etc.) are processed
3. Callback Queue: Where callbacks wait to be executed
4. Microtask Queue: Higher priority queue for promises
5. Event Loop: Checks if call stack is empty, then moves callbacks to the stack
Example flow:
\`\`\`javascript
console.log('Start');
setTimeout(() => {
  console.log('Timeout callback');
}, 0);
Promise.resolve().then(() => {
  console.log('Promise resolved');
});
console.log('End');
\`\`\`
Output:
\`\`\`
Start
End
Promise resolved
Timeout callback
\`\`\`
The Promise callback executes before the setTimeout callback because the microtask queue has higher priority than the callback queue.`,
  mastered: true,
  relatedQuestions: [5, 8]
}, {
  id: 7,
  title: "Explain time and space complexity",
  category: "Algorithms",
  subCategory: "Complexity Analysis",
  difficulty: 2,
  lastReviewed: "2023-10-05",
  dateAdded: "2023-08-20",
  tags: ["algorithms", "big o", "complexity"],
  question: "Explain time and space complexity. What is Big O notation and why is it important?",
  answer: `Time complexity measures how runtime grows as input size increases. Space complexity measures the memory usage relative to input size.
Big O notation describes the upper bound (worst-case scenario) of an algorithm's growth rate:
- O(1): Constant time (e.g., array access by index)
- O(log n): Logarithmic (e.g., binary search)
- O(n): Linear (e.g., simple for loop)
- O(n log n): Log-linear (e.g., efficient sorting algorithms)
- O(n²): Quadratic (e.g., nested loops)
- O(2^n): Exponential (e.g., recursive Fibonacci)
- O(n!): Factorial (e.g., permutations)
Example analysis:
\`\`\`javascript
function findMax(arr) { // O(n) time, O(1) space
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
function hasDuplicates(arr) { // O(n) time, O(n) space
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return true;
    seen.add(item);
  }
  return false;
}
\`\`\`
Big O is important because it helps engineers:
1. Predict performance issues
2. Compare algorithm efficiency
3. Make informed implementation choices
4. Optimize for scale`,
  mastered: false,
  relatedQuestions: [2, 10]
}, {
  id: 8,
  title: "Explain React's virtual DOM",
  category: "Frontend",
  subCategory: "React",
  difficulty: 2,
  lastReviewed: "2023-10-18",
  dateAdded: "2023-09-10",
  tags: ["react", "virtual dom", "rendering"],
  question: "What is React's Virtual DOM and how does it improve performance?",
  answer: `The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to improve performance by minimizing direct DOM manipulation.
How it works:
1. When state changes, React creates a new Virtual DOM tree
2. React compares the new Virtual DOM with the previous one (diffing)
3. It calculates the minimal set of changes needed (reconciliation)
4. Only those specific changes are applied to the actual DOM
Benefits:
- Batches DOM updates for better performance
- Abstracts browser-specific DOM operations
- Enables declarative UI programming
- Supports server-side rendering
Example of how React updates efficiently:
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`
When the button is clicked, React only updates the text content of the h1 element rather than re-rendering the entire component tree.`,
  mastered: true,
  relatedQuestions: [1, 6]
}, {
  id: 9,
  title: "Explain ACID properties in databases",
  category: "Databases",
  subCategory: "Transactions",
  difficulty: 3,
  lastReviewed: "2023-09-22",
  dateAdded: "2023-07-05",
  tags: ["databases", "transactions", "acid"],
  question: "What are ACID properties in databases and why are they important?",
  answer: `ACID is an acronym that represents a set of properties ensuring reliable database transactions:
1. Atomicity: Transactions are all-or-nothing. If any part fails, the entire transaction fails and the database state is left unchanged.
   Example: A bank transfer must either completely succeed (debit one account and credit another) or completely fail.
2. Consistency: Transactions can only bring the database from one valid state to another, maintaining all predefined rules and constraints.
   Example: If a database has a rule that all accounts must have positive balances, any transaction resulting in a negative balance would be rejected.
3. Isolation: Concurrent transactions execute in isolation, as if they were sequential, preventing interference between transactions.
   Example: Two users updating the same record won't create conflicting or corrupted data.
4. Durability: Once a transaction is committed, it remains so, even in the event of power loss or system failures.
   Example: After confirming a payment, the record persists even if the database crashes immediately after.
ACID properties are crucial for applications requiring high reliability and data integrity, such as financial systems, healthcare records, and reservation systems.`,
  mastered: false,
  relatedQuestions: [3, 12]
}, {
  id: 10,
  title: "Implement merge sort algorithm",
  category: "Algorithms",
  subCategory: "Sorting",
  difficulty: 3,
  lastReviewed: "2023-10-10",
  dateAdded: "2023-08-12",
  tags: ["algorithms", "sorting", "divide and conquer"],
  question: "Implement the merge sort algorithm and analyze its time and space complexity.",
  answer: `Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.
\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // Divide array into two halves
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  // Recursively sort both halves
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  // Compare elements and merge
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // Add remaining elements
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}
// Example usage
const sortedArray = mergeSort([38, 27, 43, 3, 9, 82, 10]);
console.log(sortedArray); // [3, 9, 10, 27, 38, 43, 82]
\`\`\`
Time Complexity: O(n log n) in all cases
- The array is divided log n times (divide)
- Each division requires O(n) operations to merge
Space Complexity: O(n)
- Additional space is needed for the temporary arrays during merging
Merge sort is stable, meaning it preserves the relative order of equal elements, making it suitable for multi-level sorting.`,
  mastered: true,
  relatedQuestions: [2, 7]
}, {
  id: 11,
  title: "Explain Java Spring Bean Scopes",
  category: "Backend",
  subCategory: "Spring Boot",
  difficulty: 3,
  lastReviewed: "2023-10-08",
  dateAdded: "2023-07-15",
  tags: ["java", "spring", "beans"],
  question: "What are the different bean scopes in Spring Framework? Explain each with examples.",
  answer: `Spring Framework defines several bean scopes that control the lifecycle and visibility of beans:
1. Singleton (default):
   - One instance per Spring container
   - Shared across all requests and threads
\`\`\`java
@Component
@Scope("singleton")
public class UserService {
    // ...
}
\`\`\`
2. Prototype:
   - New instance created every time the bean is requested
   - Not managed after creation (no destruction callbacks)
\`\`\`java
@Component
@Scope("prototype")
public class ShoppingCart {
    // ...
}
\`\`\`
3. Request:
   - One instance per HTTP request (web-aware contexts only)
\`\`\`java
@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestLogger {
    // ...
}
\`\`\`
4. Session:
   - One instance per HTTP session (web-aware contexts only)
\`\`\`java
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserPreferences {
    // ...
}
\`\`\`
5. Application:
   - One instance per ServletContext (web-aware contexts only)
\`\`\`java
@Component
@Scope(WebApplicationContext.SCOPE_APPLICATION)
public class AppConfiguration {
    // ...
}
\`\`\`
6. Websocket:
   - One instance per WebSocket session
\`\`\`java
@Component
@Scope(value = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class WebSocketHandler {
    // ...
}
\`\`\`
Choosing the right scope is important for proper resource management and thread safety.`,
  mastered: false,
  relatedQuestions: [4, 15]
}, {
  id: 12,
  title: "Explain database indexing",
  category: "Databases",
  subCategory: "Optimization",
  difficulty: 2,
  lastReviewed: "2023-09-25",
  dateAdded: "2023-08-02",
  tags: ["databases", "indexing", "performance"],
  question: "What is database indexing? Explain different types of indexes and when to use them.",
  answer: `Database indexing is a data structure technique to improve the speed of data retrieval operations.
Types of Indexes:
1. B-Tree Index (most common):
   - Balanced tree structure
   - Good for equality and range queries
   - Example: \`CREATE INDEX idx_user_email ON users(email);\`
2. Hash Index:
   - Uses hash function for lookups
   - Very fast for equality comparisons, but useless for ranges
   - Example: \`CREATE INDEX idx_user_id USING HASH ON users(id);\`
3. Bitmap Index:
   - Efficient for columns with low cardinality (few distinct values)
   - Example: \`CREATE BITMAP INDEX idx_user_status ON users(status);\`
4. Composite Index:
   - Index on multiple columns
   - Order matters for query optimization
   - Example: \`CREATE INDEX idx_name_email ON users(last_name, first_name, email);\`
5. Covering Index:
   - Includes all fields needed by the query
   - Avoids table lookups
   - Example: \`CREATE INDEX idx_covering ON orders(order_date) INCLUDE (customer_id, total);\`
6. Full-Text Index:
   - Specialized for text search
   - Example: \`CREATE FULLTEXT INDEX idx_article_content ON articles(content);\`
When to Use Indexes:
- Columns used in WHERE clauses
- JOIN conditions
- ORDER BY and GROUP BY columns
- High-cardinality columns (many unique values)
When to Avoid Indexes:
- Small tables
- Columns rarely used in queries
- Columns that update frequently
- Low-cardinality columns (unless used frequently)
Trade-offs:
- Indexes speed up reads but slow down writes
- They consume additional storage space
- Require maintenance (updates when data changes)`,
  mastered: true,
  relatedQuestions: [3, 9]
}, {
  id: 13,
  title: "Explain CSS Box Model",
  category: "Frontend",
  subCategory: "CSS",
  difficulty: 1,
  lastReviewed: "2023-10-22",
  dateAdded: "2023-09-05",
  tags: ["css", "layout", "frontend"],
  question: "Explain the CSS Box Model and how it affects layout.",
  answer: `The CSS Box Model describes how elements are rendered as rectangular boxes. Each box consists of four parts, from inside to outside:
1. Content: The actual content of the element (text, images, etc.)
2. Padding: Clear space around the content, inside the border
3. Border: A line around the padding and content
4. Margin: Clear space outside the border
\`\`\`css
div {
  /* Content dimensions */
  width: 300px;
  height: 200px;
  /* Padding */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  /* Shorthand: padding: 10px 20px; */
  /* Border */
  border: 2px solid #333;
  /* Margin */
  margin: 15px;
}
\`\`\`
By default, the \`width\` and \`height\` properties define the content box size only. This means the actual space an element takes is:
Total width = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
Total height = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
The \`box-sizing\` property can change this behavior:
\`\`\`css
/* Default behavior */
.content-box {
  box-sizing: content-box;
}
/* Width/height include content, padding and border (but not margin) */
.border-box {
  box-sizing: border-box;
}
\`\`\`
Modern practice often sets \`box-sizing: border-box\` globally for more intuitive sizing:
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\``,
  mastered: false,
  relatedQuestions: [14, 16]
}, {
  id: 14,
  title: "Explain CSS Flexbox vs Grid",
  category: "Frontend",
  subCategory: "CSS",
  difficulty: 2,
  lastReviewed: "2023-09-18",
  dateAdded: "2023-08-25",
  tags: ["css", "layout", "frontend"],
  question: "Compare CSS Flexbox and Grid. When would you use one over the other?",
  answer: `CSS Flexbox and Grid are modern layout systems with different strengths:
**Flexbox (One-dimensional layout)**
- Designed for laying out items in a single direction (row or column)
- Great for:
  - Navigation menus
  - Card layouts with variable content
  - Centering elements
  - Distributing space between items
\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* Horizontal distribution */
  align-items: center; /* Vertical alignment */
  flex-wrap: wrap; /* Allow items to wrap */
}
.item {
  flex: 1; /* Grow and shrink proportionally */
}
\`\`\`
**Grid (Two-dimensional layout)**
- Designed for two-dimensional layouts (rows and columns simultaneously)
- Great for:
  - Page layouts
  - Complex grid systems
  - Precisely positioning elements
  - Area-based layouts
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal columns */
  grid-template-rows: auto 200px auto; /* Row heights */
  gap: 20px; /* Spacing between cells */
}
.header {
  grid-column: 1 / -1; /* Span all columns */
}
\`\`\`
**When to use Flexbox:**
- When content flow is primary in a single direction
- For components like toolbars, navigation menus
- When you need flexible item sizes
- For simple alignment tasks
**When to use Grid:**
- For complex two-dimensional layouts
- When you need precise control over both rows and columns
- For overall page layout
- When you want to overlap elements
They can be used together: Grid for overall layout, Flexbox for component-level layout.`,
  mastered: true,
  relatedQuestions: [13, 16]
}, {
  id: 15,
  title: "Explain Java Streams API",
  category: "Backend",
  subCategory: "Java",
  difficulty: 3,
  lastReviewed: "2023-10-02",
  dateAdded: "2023-07-20",
  tags: ["java", "streams", "functional programming"],
  question: "Explain Java Streams API and provide examples of common operations.",
  answer: `Java Streams API, introduced in Java 8, provides a functional approach to processing collections of objects. It enables declarative, pipeline-based data processing.
Key concepts:
- Stream: A sequence of elements supporting sequential and parallel operations
- Non-mutating: Original data source remains unchanged
- Lazy evaluation: Computation only happens when terminal operation is invoked
- Once-use: A stream can only be traversed once
Common operations:
1. Creating streams:
\`\`\`java
// From collection
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
// From array
String[] array = {"a", "b", "c"};
Stream<String> stream = Arrays.stream(array);
// Stream.of
Stream<String> stream = Stream.of("a", "b", "c");
// Infinite streams
Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 1);
\`\`\`
2. Intermediate operations (return another stream):
\`\`\`java
// Filter
List<String> filtered = names.stream()
    .filter(name -> name.startsWith("J"))
    .collect(Collectors.toList());
// Map
List<Integer> lengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());
// Sorted
List<String> sorted = names.stream()
    .sorted()
    .collect(Collectors.toList());
// Distinct
List<Integer> distinct = numbers.stream()
    .distinct()
    .collect(Collectors.toList());
// Limit/Skip
List<String> limited = names.stream()
    .limit(3)
    .skip(1)
    .collect(Collectors.toList());
\`\`\`
3. Terminal operations (produce a result):
\`\`\`java
// forEach
names.stream().forEach(System.out::println);
// collect
Map<Boolean, List<Person>> peopleByGender = persons.stream()
    .collect(Collectors.partitioningBy(Person::isMale));
// reduce
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
// min/max
Optional<Person> oldest = persons.stream()
    .max(Comparator.comparing(Person::getAge));
// count
long count = names.stream()
    .filter(name -> name.length() > 5)
    .count();
// anyMatch/allMatch/noneMatch
boolean anyJohn = persons.stream()
    .anyMatch(p -> p.getName().equals("John"));
\`\`\`
4. Parallel processing:
\`\`\`java
long count = persons.parallelStream()
    .filter(p -> p.getAge() > 18)
    .count();
\`\`\``,
  mastered: false,
  relatedQuestions: [4, 11]
}];
export const categories = [{
  id: "frontend",
  name: "Frontend",
  count: 6
}, {
  id: "backend",
  name: "Backend",
  count: 3
}, {
  id: "databases",
  name: "Databases",
  count: 3
}, {
  id: "algorithms",
  name: "Algorithms",
  count: 3
}];
export const subCategories = [{
  id: "react",
  name: "React",
  categoryId: "frontend",
  count: 2
}, {
  id: "javascript",
  name: "JavaScript",
  categoryId: "frontend",
  count: 2
}, {
  id: "css",
  name: "CSS",
  categoryId: "frontend",
  count: 2
}, {
  id: "spring-boot",
  name: "Spring Boot",
  categoryId: "backend",
  count: 2
}, {
  id: "java",
  name: "Java",
  categoryId: "backend",
  count: 1
}, {
  id: "sql",
  name: "SQL",
  categoryId: "databases",
  count: 1
}, {
  id: "transactions",
  name: "Transactions",
  categoryId: "databases",
  count: 1
}, {
  id: "optimization",
  name: "Optimization",
  categoryId: "databases",
  count: 1
}, {
  id: "searching",
  name: "Searching",
  categoryId: "algorithms",
  count: 1
}, {
  id: "sorting",
  name: "Sorting",
  categoryId: "algorithms",
  count: 1
}, {
  id: "complexity-analysis",
  name: "Complexity Analysis",
  categoryId: "algorithms",
  count: 1
}];
export const tags = [{
  id: "react",
  name: "React",
  count: 2
}, {
  id: "hooks",
  name: "Hooks",
  count: 1
}, {
  id: "lifecycle",
  name: "Lifecycle",
  count: 1
}, {
  id: "frontend",
  name: "Frontend",
  count: 6
}, {
  id: "algorithms",
  name: "Algorithms",
  count: 3
}, {
  id: "binary-search",
  name: "Binary Search",
  count: 1
}, {
  id: "searching",
  name: "Searching",
  count: 1
}, {
  id: "databases",
  name: "Databases",
  count: 3
}, {
  id: "sql",
  name: "SQL",
  count: 1
}, {
  id: "normalization",
  name: "Normalization",
  count: 1
}, {
  id: "java",
  name: "Java",
  count: 3
}, {
  id: "spring",
  name: "Spring",
  count: 2
}, {
  id: "dependency-injection",
  name: "Dependency Injection",
  count: 1
}, {
  id: "backend",
  name: "Backend",
  count: 3
}, {
  id: "javascript",
  name: "JavaScript",
  count: 3
}, {
  id: "optimization",
  name: "Optimization",
  count: 2
}, {
  id: "event-loop",
  name: "Event Loop",
  count: 1
}, {
  id: "asynchronous",
  name: "Asynchronous",
  count: 1
}, {
  id: "big-o",
  name: "Big O",
  count: 1
}, {
  id: "complexity",
  name: "Complexity",
  count: 1
}, {
  id: "virtual-dom",
  name: "Virtual DOM",
  count: 1
}, {
  id: "rendering",
  name: "Rendering",
  count: 1
}, {
  id: "transactions",
  name: "Transactions",
  count: 1
}, {
  id: "acid",
  name: "ACID",
  count: 1
}, {
  id: "sorting",
  name: "Sorting",
  count: 1
}, {
  id: "divide-and-conquer",
  name: "Divide and Conquer",
  count: 1
}, {
  id: "beans",
  name: "Beans",
  count: 1
}, {
  id: "indexing",
  name: "Indexing",
  count: 1
}, {
  id: "performance",
  name: "Performance",
  count: 1
}, {
  id: "css",
  name: "CSS",
  count: 2
}, {
  id: "layout",
  name: "Layout",
  count: 2
}, {
  id: "streams",
  name: "Streams",
  count: 1
}, {
  id: "functional-programming",
  name: "Functional Programming",
  count: 1
}];
export const stats = {
  totalQuestions: 247,
  masteredQuestions: 112,
  recentlyAdded: 15,
  studiedThisWeek: 42,
  categories: 12,
  averageDifficulty: 2.4
};