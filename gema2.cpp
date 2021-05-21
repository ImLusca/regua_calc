#include<bits/stdc++.h>
using namespace std;

int main(){
    int n =0, tmp =0, menor=0, maior=0;
    string contagem;
    cin >> n;
    vector<int> dia_cont(1000,0);
    for(int i=0; i < n; i ++){
        cin >> contagem;
        tmp = contagem.size();
        //|
        dia_cont[tmp] +=1;
    }
    
    if( n == 1){
        cout << contagem.size() << endl;
        return 0;
    }
    for(int i=0; i < 1000; i++){
        if(dia_cont[i] > maior || maior == 0){
            maior = i;
        }
    }
    cout << maior << endl;
}
