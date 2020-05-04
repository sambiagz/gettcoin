<form action="index.php"method="post"><br>
FirstName: <input type="text" name="username" id=""><br><BR>
LastName: <input type="text" name="password" id=""><br><br>
Email: <input type="email" name="email" id=""><br><br>
<input type="submit" value="SUBMIT"><br><br>
</form>


<?php

$fname= $_POST["username"];
$lname= $_POST["password"];
$email=$_POST["email"];

$dbServername="localhost";
$dbUsername="root";
$dbPassword="";
$dbName="myDB";
//Creating Connection
$conn=mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);
//Checking Connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
// Create database
// $sql = "CREATE DATABASE myDB";
// if (mysqli_query($conn, $sql)) {
//     echo "Database created successfully";
// } else {
//     echo "Error creating database: " . mysqli_error($conn);
// }

// // sql to create table
// $sql = "CREATE TABLE MyGuests (
// id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// firstname VARCHAR(30) NOT NULL,
// lastname VARCHAR(30) NOT NULL,
// email VARCHAR(50),
// reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// )";

// if (mysqli_query($conn, $sql)) {
//     echo "Table MyGuests created successfully";
// } else {
//     echo "Error creating table: " . mysqli_error($conn);
// }

// $sql ="INSERT INTO MyGuests(firstName,LastName,Email)
// VALUES('John','Doe','johndoe@gmail.com')";
// if (mysqli_query($conn, $sql)) {
//     echo "New record created successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
// }

// $sql ="INSERT INTO myguests(firstName,LastName,Email)
// VALUES('Alex','Omondi','aleko@gmail.com')";
// if (mysqli_query($conn, $sql)) {
//     echo "New record created successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
// }
$sql ="INSERT INTO myguests(firstName,LastName,Email)
VALUES('$fname','$lname','$email')";
if (mysqli_query($conn, $sql)) {
    $last_id = mysqli_insert_id($conn);//returns last id entered
    echo "New record created successfully. Last inserted ID is: ".$last_id;
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

echo "<hr>";
// prepare and bind
$stmt = $conn->prepare("INSERT INTO MyGuests (firstname, lastname, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $firstname, $lastname, $email);

// set parameters and execute
$firstname = "John";
$lastname = "Doe";
$email = "john@example.com";
$stmt->execute();

$firstname = "Mary";
$lastname = "Moe";
$email = "mary@example.com";
$stmt->execute();


echo "<hr>";
//Selecting Data
$sql = "SELECT firstname, lastname ,email FROM MyGuests";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo " - Name: " . $row["firstname"]. " " . $row["lastname"]. " " . $row["email"]. "<br>";
    }
} else {
    echo "0 results";
}

echo "<hr>";
//select where clause
$sql = "SELECT firstname, lastname FROM MyGuests WHERE lastname='Doe'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}

echo "<hr>";
//ORder by
$sql = "SELECT firstname, lastname FROM MyGuests ORDER BY lastname";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}

echo "<hr>";

// sql to delete a record
$sql = "DELETE FROM MyGuests WHERE id='john'";

if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

echo '<hr>';
//Mysql update data
$sql = "UPDATE MyGuests SET lastname='Ocampo' WHERE id=2";
if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

echo '<hr>';
//Select Limit
$sql = "SELECT * FROM myguests LIMIT 5";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}
mysqli_close($conn);
?>