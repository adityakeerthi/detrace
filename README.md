# DeTrace #
## Inspiration ##
The idea behind the DeTrace is that we wanted to find a way to introduce contact tracing in a safe manner. Many experts say that contact tracing would massively improve the ability to stop the spread of COVID. Due to the privacy concerns, people simply do not feel safe to take part in such programs, as they feel they may jeopardize their security.

We were inspired to include a blockchain solution due to a blockchain's system ability to secure given computer networks. We thought we should take advantage of wallet IDs and the immutable data pointer structure as a way to increase the efficiency of contact tracing, while also decreasing the chances of privacy problems.

## What it does ##
Our application allows users to import contacts, and receive anonymous warnings about their potential contacts who have contracted COVID-19. Users can import connections in a way that does not reveal any personal data of the given connection. We also created a network system that recognizes "second generation" contacts, and the program will warn you to take percussion when an indirect contact has become infected.

The application also utilizes a depth search algorithm that can potentially return massive graphs of the entire connection tree from one user to another. This graph also shows when certain users have been infected with COVID-19. You can search ANY account to receive a full depth search from any given address, their contacts, the indirect contacts, and any contacts that share a distant cousin address. This is very useful for analyzing the progress and growth of COVID in a Tree. Since often these Trees are geographically bound, or in some way connected, Researchers, Doctors, and Government can help track down and create better represented models of how COVID spreads, as all the necessarily information, including time, path, and total infection rate can all be retrieved from the blockchain network itself. All of this is done without ever pointing to personal data, allowing users to priortize both their safety and their privacy.

The program allows you to also update their COVID status in a safe way, that will benefit researchers, government, and even the general population. 

## How we built it ##
The infrastructure of DeTrack is VERY complicated. We used a number of complex data structures and algorithms to make this type of network possible. All of the data itself, including COVID status, connections, and second generation connections is stored on the blockchain in Solidity Smart Contracts themselves. Markos had to use experimental ABI compilers in order to create the Tree data structures, as well as providing the recursive functions necessary to derrive the total Tree of any given contact. We had 2 main Hash Maps that allowed us to point Contact lists and statuses to users. The smart  contract had to return those values in a way that does not leave trails or security issues open, while also providing the memory capacity and capabilities to recursively call multiple functions to derive multiple depths deep of contacts, simply from one contact. We then created a backend Express server, complete with a JSONRPC Signer that is linked to the local Ethereum blockchain network on Markos's computer. This way, we could call the Smart Contract functions from the backend using the signer, and simply factor the return value into endpoints for our front end.

For our front end we used React in order to dynamically change and display the data. We used Fetch API to call our Backend functions quite a few times (over 2000 blockchain calls during development). We used Material UI and React Tree Graph to design our front end graphs and interface.

## Challenges we ran into ##
There were 4 particularly difficult parts of this project. The first one was designing this complex project structure that we would follow. The second main issue was finding a way to effectively visualize scalable address Trees, which is where React Tree Graph came in. That said, it was a little difficult to use due to it's tight restrictions on input entry. The third major issue was creating the data structures in the Smart Contract. This proved VERY difficult as a number of the typical things you do in languages like Python and C++ was simply not possible/easy in Solidity. We had to use less documented and known features, including the experimental compiler in order to create the usable recursive functions that our backend used often. The last challenge was designing and implementing a BFS Algorithm that would return all the connected values to the maximum depth of any given address in order to be displayed on the front end.

## Accomplishments that we're proud of ##
We are definitely proud of our perseverance and problem solving skills. If we hadn't sticked and calmly continued to bug fix, we would not have seen the success that this project has. 

## What we learned ##
We learned the value of algorithmic implementation and advanced data structures / systems in even Web applications. It was very interesting (and sometimes frustrating) when things didn't initially work out, but through this process we 100%all learned more than we came into this project, especially for problem solving.

## What's next for DeTrace ##
DeTrace is going to look for ways to continue maximizing the security and effectiveness as a solution. Creating more smooth and optimized systems within the program is also a main next priority, as scalability is important for the wide adaptation of the program

Developed by Aditya Keerthi, Daniel Yu, Markos Georghiades, and Luke Zhang.
