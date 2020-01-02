#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#include "WiFiManager.h"

//Biblioteca do motor de passo e do servo motor
#include <Stepper.h> 

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

//Configuracao acess point caso não conecte automaticamente ao wifi
#define SSIDAP "anaue"
#define PASSAP "4321"

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

//endpoint API
String endpoint = "http://ec2-18-191-184-225.us-east-2.compute.amazonaws.com:4513/api/";


//Informacoes do usuario
String tagUsuario = "5d24f2ad4bff82001242b26a";
String tagDispositivo = "6ea942c0-a284-11e9-a4e3-273e54c5f813";

//Informacoes API
String linkGetParam = endpoint + "device?userid=" + tagUsuario + "&deviceid=" + tagDispositivo;

int usuarioConfgurado = 1;

//Informacoes dos compartimentos
const int qtdCompartimentos = 8;
//int posCompartimentos[qtdCompartimentos] = {0,250,500,750,-250,-500,-750, -1000};
int posCompartimentos[qtdCompartimentos] = {0,270,530,800,1070,1340,1600, 1830};

//Informacoes do motor de passo
const int stepsPerRevolution = 200; 
int velocidadeMotor = 60;
int movimentoMotor = 0;

//Informacoes do alarme
int statusAlarme = 0;
int posicaoAlarme = 0;
int mensagemRecebida = 0;


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//Pinagem do dispositivo
#define LED D3
#define BUZZER D1

//Tempo de atualizacao do dispositivo
#define TEMPO_DE_ATUALIZACAO_NORMAL 5000
#define TEMPO_DE_ATUALIZACAO_PROCESSO 2000
#define TEMPO_TOMAR_REMEDIO 10000

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//Iniciando os objetos
//VERDE/ROXO/AZUL/AMARELO
Stepper myStepper(stepsPerRevolution, D7, D8, D5, D6); 


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//Funcoes necessarias

void acionarBuzzer(int tempo){
  digitalWrite(BUZZER,HIGH);
  delay(tempo);
  digitalWrite(BUZZER,LOW);
  delay(tempo); 
}

void moverMotor(int pos){
  myStepper.step(posCompartimentos[pos]);
  delayMicroseconds(10000);
  movimentoMotor = posCompartimentos[pos];
  Serial.print("moveuAte");
}

void voltarMotor(){
  Serial.println(movimentoMotor);
  myStepper.step(-movimentoMotor);
  delayMicroseconds(10000);
  movimentoMotor = 0;
  Serial.print("voltouDe");
}

//Callback para configuração do wifi
void callbackDeConfiguracao (WiFiManager *myWiFiManager) {
  Serial.println("Entrou em modo de configuração");
  digitalWrite(LED,LOW);
  Serial.println(WiFi.softAPIP());  //IP do dispositivo
  Serial.println(myWiFiManager->getConfigPortalSSID()); //Configuracoes do wifi
}

int calibrando = 0;
int ler;

void calibrarMotor(){
  calibrando = 1;
  Serial.println("c0");
  int calibrado = 0;
  while(calibrado == 0){
    ler = (analogRead(0));
    Serial.println(ler);
    
    if(ler>40){
      myStepper.step(-1);
      //myStepper.off();
      yield();
    }else{
      myStepper.step(3);
      yield();
      calibrado = 1;
      calibrando = 0;
      }
  }
  Serial.println("c1");
    
}


void motorStep( int pos){

   for(int x = 0; x < pos; x++) {
        myStepper.step(1);
        yield();
        delayMicroseconds(500);
      }
}


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


void setup() 
{
  Serial.begin(115200);

  pinMode(LED, OUTPUT);
  digitalWrite(LED,LOW);
  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER,LOW);
  
  myStepper.setSpeed(velocidadeMotor);
  
  //----------------------------------------------------------
  //----------------------------------------------------------

  WiFiManager wifiManager;
  
  //set callback that gets called when connecting to previous WiFi fails, and enters Access Point mode
  wifiManager.setAPCallback(callbackDeConfiguracao);

  if(!wifiManager.autoConnect(SSIDAP,PASSAP)) {
    ESP.reset();
    delay(1000);
  } 

  //Se conectou ao wifi
  Serial.print("SSID: ");
  Serial.print(WiFi.SSID());
  Serial.println("Conectado ....");
  acionarBuzzer(100);
  
  digitalWrite(LED,HIGH);
  acionarBuzzer(100);
  
}


void loop() 
{
  
  //Verifica se esta conectado ao wifi 
  if (WiFi.status() == WL_CONNECTED){
    //Mantem o led aceso para informar que esta conectado
    digitalWrite(LED,HIGH);
    delay(100);

    //Objeto da classe HTTPClient
    HTTPClient http2; 

    //Link de conexao a API
    Serial.println(linkGetParam);
    http2.begin(linkGetParam);

    //HTTP GET
    int httpResponseCode2 = http2.GET();

    String mensagemResposta = "";
    
    //Se ocorreu tudo certo no GET
    if (httpResponseCode2 > 0){ 
      
      String httpPayload2 = http2.getString();
      Serial.println(httpPayload2 ); 

      //Configuracao para analise JSON
      const size_t bufferSize = JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(8) + 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(httpPayload2 );   
      
      posicaoAlarme = root["slot"];
      statusAlarme = root["status"];
      
      Serial.print("posicaoAlarme(slot): ");
      Serial.println(posicaoAlarme);
      Serial.print("statusAlarme(status): ");  
      Serial.println(statusAlarme);
      
      
      //Trata a maquina de estado
      //Sem alarme
      if(statusAlarme == 0 ){
        Serial.println("Nada");
        mensagemResposta = "0";
      }
    
      //Alerta do app: Alarmando
      else if(statusAlarme == 1 ){
        Serial.println("Alarmando");
        acionarBuzzer(100);
        acionarBuzzer(50);
        mensagemResposta = "1";
      }
    
      //Botao do app: Tomar
      else if(statusAlarme == 2 && mensagemRecebida != 2){
        Serial.println("Tomar");   
        Serial.println("l0");
        calibrarMotor();
        Serial.println("l1");
        
        Serial.println("l2");
        motorStep(posCompartimentos[posicaoAlarme]);
        yield();
        Serial.println("l3");
  
        Serial.println("l4");
        acionarBuzzer(60);
        delay(TEMPO_TOMAR_REMEDIO);
        acionarBuzzer(60);
        delay(TEMPO_TOMAR_REMEDIO/2);
        yield();
        Serial.println("l5");
  
        Serial.println("l6");
        calibrarMotor();
        Serial.println("l7");
        
        mensagemResposta = "2";
        
      }
    
      //Botao do app: Tomei
      else if(statusAlarme == 3 && mensagemRecebida != 3){
        Serial.println("Tomei");
        mensagemResposta = "3";
          
      }
    
      //Botao do app: Adiar
      else if(statusAlarme == 4 && mensagemRecebida != 4){
        Serial.println("Adiar");
        acionarBuzzer(100);
        acionarBuzzer(100);
        acionarBuzzer(100);
        mensagemResposta = "4";
      }

    
      //Botao do app: Cancelar
      else if(statusAlarme == 5 && mensagemRecebida != 5){
        Serial.println("Cancelar");
        acionarBuzzer(100);
        acionarBuzzer(100);
        acionarBuzzer(100);
        mensagemResposta = "5";


      //Botao do app: Resetar wifi
      }else if(statusAlarme == 6 && mensagemRecebida != 6){
        acionarBuzzer(100);
        acionarBuzzer(100);
        acionarBuzzer(100);

        WiFiManager wifiManager2;
        wifiManager2.resetSettings();
        ESP.restart();
        
      }

      else{
        Serial.println("Erro de comunicacao");
        delay(100);
        digitalWrite(LED,LOW);
        
        acionarBuzzer(100);
        acionarBuzzer(100);
        acionarBuzzer(100);
        acionarBuzzer(100);
        mensagemResposta = "7";
      }

      //Atualiza o status antigo
      mensagemRecebida = statusAlarme;
      
      
    }else{  
      Serial.println("Erro na conexao API");
      //Desliga o led para informar um erro
      digitalWrite(LED,LOW);
      acionarBuzzer(100);
      acionarBuzzer(100);
      acionarBuzzer(100);
      acionarBuzzer(100);
    }

    //Encerra a conexao TCP
    http2.end(); 
    
  }else{
    
    Serial.println("Erro na conexao wifi"); 
    //Desliga o led para informar um erro
    digitalWrite(LED,LOW);
    acionarBuzzer(100);
    acionarBuzzer(100);
    acionarBuzzer(100);
    acionarBuzzer(100);
    //Reestabelece a conexao wifi
    ESP.restart();
  }
  
  //Tempo de atualização
  if(statusAlarme == 0){
    delay(TEMPO_DE_ATUALIZACAO_NORMAL);
  }else{
    delay(TEMPO_DE_ATUALIZACAO_PROCESSO);
  }

  
}
