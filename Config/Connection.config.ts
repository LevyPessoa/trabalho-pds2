#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>

void connection() {
    try {
        mongocxx::instance instance{}; // Isso inicializa a biblioteca do MongoDB
        mongocxx::client client{mongocxx::uri{"mongodb://localhost:27017/pds2"}};
        
        std::cout << "Conexão estabelecida com sucesso!" << std::endl;

    } catch (const std::exception &e) {
        std::cerr << "Erro ao conectar ao MongoDB: " << e.what() << std::endl;
    }
}

int main() {
    connection();

    return 0;
}
