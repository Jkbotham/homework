LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Sales'),(3,'CEO'),(10,'Marketing'),(12,'Operations');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'James','Botham',2,NULL),(2,'John','lous',1,1),(3,'zach','johnson',1,1),(4,'billybob','Mango',6,2),(5,'Bob','Dobolina',3,1),(6,'Thomas','Anderson',4,NULL),(7,'Edna','Mode',1,1),(8,'Wednesday',' Addams',5,4),(9,'Inigo','Montoya',6,2),(10,'Marge','Gunderson',7,3),(12,'jacob','BingBong',7,2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Sales Manager',100000,1),(2,'CEO',1200000,3),(3,'Operations Assistant',50000,12),(4,'Operations Director',75000,12),(5,'Intern',30000,12),(6,'Marketing Specialist',60000,10),(7,'Product Manager',60000,10);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;