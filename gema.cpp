#include<bits/stdc++.h>
using namespace std;

int main(){
    int n =0, termo = 0, contagem = 0, k =0,digito = 0, soma= 0;
    cin >> n >> k;
    if(n == 1){
        cout << (k == 1) << endl;
        return 0;
    }

    if(k == 0){
        cout << 0 << endl;
        return 0;
    }

    if(k == 1){
        cout << 1 << endl;
        return 0;
    }

    //9 /4 = 2 | 1
    // 1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192
    // 1,2,3,4,5 ,6 ,7 ,8 , 9  , 10, 11 ,12  ,  13, 14
    switch(k){
        case 8: digito = 0;
        break;
        case 6: digito = 1;
        break;
        case 2: digito = 2;
        break;
        case 4: digito = 3;
    }
    
    //cout << digito << endl;

    if( k % 2 == 0){
        
        int resto = (n % 4);
        contagem = (n /4) - 1; 
        contagem += (caso >= digito);
        
        
    }
   
   cout << contagem << endl;
    
    return 0;
    
}
