# Miau

## Requisitos funcionais
### Autenticação
[X] Deve ser possível se autenticar como admin</br>
[X] Deve ser possível se autenticar como tutor</br>
[X] Deve ser possível se autenticar como veterinario</br>

### Animais
[X] Deve ser possível cadastrar um animal</br>
[X] Deve ser possível atualizar os dados de um animal</br>
[] Deve ser possível excluir um animal</br>
[X] Deve ser possível visualizar todos os animais do sistema</br>
[ ] Deve ser possível visualizar todas as consultas de um animal </br> 

### Tutores
[X] Deve ser possível cadastrar um tutor</br>
[X] Deve ser possível atualizar os dados de um tutor</br>
[ ] Deve ser possível excluir um tutor</br>
[X] Deve ser possível visualizar todos os tutores do sistema</br>
[X] Deve ser possível visualizar todos os animais de um tutor</br>
[ ] Deve ser possível visualizar todas as consultas de um tutor</br> 

### Veterinario
[X] Deve ser possível cadastrar um veterinário</br>
[X] Deve ser possível atualizar os dados de um veterinário</br>
[] Deve ser possível excluir um veterinário</br>
[X] Deve ser possível visualizar todos os veterinarios do sistema</br>
[X] Deve ser possível visualizar todas as consutlas de um veterinario</br>

### Consultas
[X] Deve ser possível que o tutor solicite uma consulta em um determinado dia e enviando três horários de disponibilidade</br>
[X] Deve ser possível que o veterinário aceite uma solicitação de consulta</br>
[] Deve ser possível que o veterinário recuse uma solicitação de consulta, dando uma justificativa para a recusa.</br>
[X] Deve ser possível que o veterinário finalize uma consulta</br>
[] Deve ser possível que o tutor cancele uma solicitação de consulta</br>
[] Deve ser possível que o tutor cancele uma consulta</br>
[] Deve ser possível que o veterinário visualize todas as consultas solicitadas para ele.</br>
[] Deve ser possível que o veterinário visualize todas as suas consultas em andamento.</br>
[] Deve ser possível que o veterinário visualize todas as consultas finalizadas.</br>

## Regras de negócio
[] Somente o ADMIN pode cadastrar veterinarios</br>
[] O tutor pode se cadastrar</br>
[] Somente o ADMIN pode excluir tutores, veterinários e animais</br>
[] Se um animal for excluído, ele deve ser marcado como inativo para manter o histórico de consultas

[] O tutor pode editar seus próprios dados e os de seus animais</br>
[] O veterinário pode editar suas próprias informações</br>
[] O veterinário pode editar as informações de qualquer animal e tutor</br>

[X] O tutor deve sugerir até 3 horários ao solicitar uma consulta.</br>
[] O veterinário pode aceitar um recusar uma solicitação de consulta, com justificativa predefinida ou personalizada.</br>
[] O veterinário deve marcar uma consulta como finalizada e adicionar observações.</br>
[] O tutor pode visualizar apenas suas consultas e as de seus animais.</br>
[X] O acesso ao sistema é baseado em roles (ADMIN, TUTOR, VETERINARIO)</br>
[] O admin tem acesso total e pode realizar qualquer operação no sistema.</br>

## Rotas
### Users
[X] POST /authenticate - Autenticação</br>
[X] GET /profile - Obter dados do usuário autenticado</br>
[X] GET /users - Obter todos os usuários</br>
[X] PATCH /token/refresh - Atualizar token de autenticação</br>

### Owners
[X] POST /owners - Registrar um tutor</br>
[X] GET /owners - Obter todos os tutores</br>
[X] GET /owners/:id/animals - Obter todos os animais de um tutor</br>
[X] GET /owners/:id/appointments - Obter todas as consultas de um tutor</br>
[X] PUT /owners/me - Tutor atualiza seus próprios dados</br>
[X] PUT /owners/:id - Admin atualiza os dados de um tutor</br>
[] DELETE /owner/:id</br>

### Veterinarians
[X] POST /veterinarians - Criar um veterinario</br>
[X] GET /veterinarians - Obter todos os veterinarios</br>
[] GET /veterinarians/:id/appointments - Obter todas as consultas de um tutor</br>
[] PUT /veterinarians/:id - Atualizar dados de um veterinario</br>
[] DELETE /veterinarians/:id - Excluir um veterinario</br>

### Animals
[X] POST /animals - Criar um animal</br>
[X] GET /animals - Obter todos os animais</br>
[] GET /animals/:id/appointments - Obter todas as consultas de um animal</br>
[X] POST /animals/:id/upload - Atualizar a imagem de um animal</br>
[] PUT /animals/:id - Atualizar um animal</br>
[] DELETE /animals/:id - Excluir um animal</br>

### Consultas
[X] POST /appointments - Solicitar uma consulta</br>
[] GET /appointments/requested - Obter todas as consultas com status de Solicitado do veterinario autenticado</br>
[X] PATCH /appointments/:id/accept - Aceitar uma consulta</br>
[X] PATCH /appointments/:id/deny - Recusar uma consulta</br>
[X] PATCH /appointments/:id/finish - Finalizar uma consulta</br>
[X] PATCH /appointments/:id/update - Atualizar uma consulta</br>

## Fluxo
1. Tutor solicita uma consulta, enviando três horários preferenciais
2. Veterinario aceita um dos horários via PUT /appointments/:id/accept
3. Se o veterinario não puder nos horários sugeridos, ele sugere um novo horário via PUT /appointments/suggest-date
4. Tutor aceita via PUT /appointments/:id/accept
