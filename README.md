# 2021_JustNotBooks
JUST NOT BOOKS-Buy. Borrow. Rent

User Manual
About:
Every academic year, a lot of things gets exchanged among students within colleges and schools. This approach of borrowing items from their fellow students becomes a problem when the required item is not available within the college or it may be in use. Issues of these traditional methods can be resolved using a common platform among students from different colleges and schools. This common platform is a free-to-use website for student-to-student online uploaded and borrowed or brought items.
This website operates as an inter-college online classifieds market place for used items of the students including electronic calculators, drafters, aprons etc., It is accessible through the internet. The description of the items uploaded by the lender gives borrowers a clear idea about the item. These items are categorized based on buy, borrow or donate and can be accessed easily. Borrower can contact the lender privately after requesting an item. All the irrelevant activities are controlled by the admin. This will reduce the physical efforts of students meeting different individuals in the college.

Software Requirements:

•	IntelliJ IDEA
•	Visual Studio Code
•	MySQL
•	Node Package Manager(npm- to enable react application)

Download:
	Browser of choice to download visual studio code Visual Studio Code - Code Editing. Redefined
	Download IntelliJ IDEA from Download IntelliJ IDEA: The Java IDE for Professional Developers by JetBrains
	Download MySQL from MySQL :: MySQL Community Downloads
	Install npm from npm | get npm (npmjs.com)
Download as per the OS either windows or IOS
How to Use:
After Installing all the software set up the project as follows
•	Open the backend project (service folder) in the IntelliJ
•	Open the Frontend code (ui folder) in the Visual Studio code
•	To start the project, Open command prompt and run the following commands
$git clone “GitHub URL”
cd location_of_project_folder
$npm install package_name --save  {to install any packages}
$npm start
This will open the project in the browser
•	Browser will load the ui to http://localhost:3000/ 

Configurations for Backend:
Config for idea source configuration in build.gradle file.
plugins {
     ....
    id 'idea'
}
..
idea {
    module {
        sourceDirs += file("app")
        testSourceDirs += file("test")
        scopes.COMPILE = [plus: [configurations.play], minus: []]
        scopes.RUNTIME = [plus: [configurations.playRun], minus:[configurations.play]]
        scopes.TEST = [plus: [configurations.playTest], minus: [configurations.playRun]]
     }
}
...

To Run (Run config)
•	Open run configuration window
•	Click on (+) and Select Gradle
•	Name: as you need
•	Gradle project: your root project or location of your root project
•	Tasks: runPlayBinary




Go to IntelliJ preference (Ctrl+Alt+S)
•	Go to [Build, Execution and Deployment] section
•	Select build tool as gradle
For Database Connectivity:
•	Open MySQL Command Line Client and enter your server password.
•	“create database project;” //to create database
•	“use project;” //to use the project database

Run the service folder in IntelliJ by clicking the green run button, when the terminal says 
“9 actionable tasks: 1 executed, 8 up-to-date
Waiting for changes to input files of tasks...”

•	open http://localhost:9000/ .
Register and login for the access of application.





