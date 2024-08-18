const { createApp, reactive, ref, computed, watch } = Vue;

// Ejercicio 1
// Componente que muestra el mensaje de bienvenida
const BienvenidaMsj = {
  template: `
    <div>
      <h1 v-if="state.name" style="margin: 20px;">Bienvenido, {{ state.name }}!</h1>
      <!-- Input para ingresar el nombre, usa v-model para enlazar con el estado reactivo -->
      <input v-model="state.name" placeholder="Escribe tu nombre" class="form-control" style="margin: 20px; max-width: 400px;"/>
    </div>
  `,
  setup() {
    // Utiliza reactive para crear un estado reactivo
    const state = reactive({
      name: '' // Inicializa con una cadena vacía
    });

    return { state };
  }
};

// El ejercicio 2 lo hice directamente en el html

// Ejercicio 3
// Componente que muestra u oculta un mensaje
const MostrarMensaje = {
  template: `
    <div>
      <!-- Botón para alternar la visibilidad del mensaje -->
      <button @click="toggleVisibility" class="btn btn-primary" style="margin-top: 20px; margin-left: 20px">
        {{ isVisible ? 'Ocultar' : 'Mostrar' }} mensaje
      </button>
      <!-- Párrafo que se muestra u oculta según la visibilidad -->
      <p v-if="isVisible" style="margin-top: 10px; margin-left: 20px">Y aquí... está el mensaje a mostrar/ocultar.</p>
    </div>
  `,
  setup() {
    // Utiliza ref para crear una referencia reactiva que controla la visibilidad
    const isVisible = ref(false);

    // Función para alternar la visibilidad
    const toggleVisibility = () => {
      isVisible.value = !isVisible.value;
    };

    return { isVisible, toggleVisibility };
  }
};

// Ejercicio 4
// Componente que muestra una alerta
const Alertamsj = {
  template: `
    <div>
      <!-- Input para ingresar un valor, usa v-model para enlazar con el estado reactivo -->
      <input v-model="inputValue" placeholder="Escribe algo" class="form-control mb-3" style="margin: 20px; max-width: 400px;"/>
      <!-- Botón para mostrar una alerta con el valor ingresado -->
      <button @click="showAlert" class="btn btn-primary" style="margin-left: 20px;">Mostrar mensaje/alerta</button>
    </div>
  `,
  setup() {
    const inputValue = ref(''); // Estado reactivo para almacenar el valor del input

    // Función para mostrar una alerta con el valor ingresado
    const showAlert = () => {
      alert(`Mensaje: ${inputValue.value}`);
    };

    return { inputValue, showAlert };
  }
};

// Ejercicio 5
// Componente que muestra un listado de tareas
const ListadoTareas = {
  template: `
  <div class="container">
    <h2 class="my-4">Lista de Tareas</h2>
    <!-- Input para ingresar una nueva tarea -->
    <input v-model="newTask" placeholder="Escribe una nueva tarea" class="form-control mb-3" />
    <!-- Botón para agregar la nueva tarea -->
    <button @click="addTask" class="btn btn-primary mb-3">Agregar Tarea</button>

    <!-- Lista de tareas -->
    <ul class="list-group">
      <li v-for="(task, index) in tasks" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
        {{ task }}
        <!-- Botón para eliminar la tarea correspondiente -->
        <button @click="removeTask(index)" class="btn btn-danger btn-sm">Eliminar <i class="fas fa-trash-alt"></i></button>
      </li>
    </ul>
  </div>
`,
  setup() {
    const newTask = ref(''); // Almacena el valor de la nueva tarea
    const tasks = ref([]); // Arreglo para almacenar las tareas

    // Función para agregar la nueva tarea al arreglo
    const addTask = () => {
      if (newTask.value.trim() !== '') {
        tasks.value.push(newTask.value);
        newTask.value = ''; // Limpia el campo de entrada
      }
    };

    // Función para eliminar una tarea en el índice dado
    const removeTask = (index) => {
      tasks.value.splice(index, 1);
    };

    return {
      newTask,
      tasks,
      addTask,
      removeTask
    };
  }
};

// Ejercicio 6
// Componente que muestra una calculadora
const Calculadora = {
  template: `
    <div class="container">
      <h2 class="my-4">Calculadora</h2>
      
      <div class="mb-3">
        <!-- Input para el primer número -->
        <label for="num1" class="form-label">Número 1</label>
        <input v-model.number="num1" type="number" id="num1" class="form-control" />
      </div>

      <div class="mb-3">
        <!-- Input para el segundo número -->
        <label for="num2" class="form-label">Número 2</label>
        <input v-model.number="num2" type="number" id="num2" class="form-control" />
      </div>

      <div class="mb-3">
        <!-- Selector para elegir la operación -->
        <label for="operation" class="form-label">Operación</label>
        <select v-model="operation" id="operation" class="form-select">
          <option value="add">Sumar</option>
          <option value="subtract">Restar</option>
          <option value="multiply">Multiplicar</option>
          <option value="divide">Dividir</option>
        </select>
      </div>

      <!-- Botón para realizar el cálculo -->
      <button @click="calculate" class="btn btn-primary">Calcular</button>

      <!-- Muestra el resultado del cálculo -->
      <h3 class="mt-4">Resultado: {{ result }}</h3>
    </div>
  `,
  setup() {
    const num1 = ref(0); // Primer número
    const num2 = ref(0); // Segundo número
    const operation = ref('add'); // Operación seleccionada
    const result = ref(0); // Resultado de la operación

    // Función para realizar el cálculo según la operación seleccionada
    const calculate = () => {
      switch (operation.value) {
        case 'add':
          result.value = num1.value + num2.value;
          break;
        case 'subtract':
          result.value = num1.value - num2.value;
          break;
        case 'multiply':
          result.value = num1.value * num2.value;
          break;
        case 'divide':
          result.value = num2.value !== 0 ? num1.value / num2.value : 'Error: División por 0';
          break;
      }
    };

    return {
      num1,
      num2,
      operation,
      result,
      calculate
    };
  }
};

// Ejercicio 7
// Componente que cambia de tema oscuro a claro
const TemaOscClaro = {
  template: `
    <div :class="theme">
      <!-- Botón para alternar entre tema oscuro y claro -->
      <button @click="toggleTheme" class="btn" style="margin: 20px;" :class="themeClass">
        Cambiar a {{ themeText }}
      </button>
    </div>
  `,
  setup() {
    const isDarkTheme = ref(false); // Estado para el tema oscuro

    // Función para alternar el tema
    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
    };

    // Propiedades computadas para determinar las clases CSS del tema
    const theme = computed(() => (isDarkTheme.value ? 'dark-theme' : 'light-theme'));
    const themeClass = computed(() => (isDarkTheme.value ? 'btn-light' : 'btn-dark'));
    const themeText = computed(() => (isDarkTheme.value ? 'Tema Claro' : 'Tema Oscuro'));

    return {
      isDarkTheme,
      toggleTheme,
      theme,
      themeClass,
      themeText,
    };
  }
};

// Ejercicio 8
// Componente que muestra mensaje mendiante condicion
const MensajeCondicional = {
  template: `
    <div>
      <!-- Muestra el mensaje basado en la condición -->
      <h2 style="margin-left: 20px; margin-top: 20px">{{ mensaje }}</h2>
      <!-- Botón para cambiar la condición -->
      <button @click="toggleCondition" class="btn btn-primary" style="margin-left: 20px;">
        Cambiar condición
      </button>
    </div>
  `,
  setup() {
    const condicion = ref(false); // Estado de la condición

    // Función para alternar el valor de la condición
    const toggleCondition = () => {
      condicion.value = !condicion.value;
    };

    // Propiedad computada para determinar el mensaje según la condición
    const mensaje = computed(() => (condicion.value ? 'El valor es verdadero' : 'El valor es falso'));

    return {
      condicion,
      toggleCondition,
      mensaje,
    };
  }
};

// Ejercicio 9
// Componente que muestra el nombre completo
const NombreCompleto = {
  template: `
    <div>
      <!-- Input para el nombre -->
      <input v-model="nombre" placeholder="Escribe el nombre" class="form-control mb-2" style="margin: 20px; max-width: 400px;" />
      <!-- Input para el apellido -->
      <input v-model="apellido" placeholder="Escribe el apellido" class="form-control mb-2" style="margin-left: 20px; max-width: 400px;" />
      <!-- Muestra el nombre completo -->
      <h2 style="margin-left: 20px;">Nombre completo: {{ nombreCompleto }}</h2>
    </div>
  `,
  setup() {
    const nombre = ref(''); // Estado para el nombre
    const apellido = ref(''); // Estado para el apellido

    // Propiedad computada para obtener el nombre completo
    const nombreCompleto = computed(() => `${nombre.value} ${apellido.value}`);

    return {
      nombre,
      apellido,
      nombreCompleto,
    };
  }
};

// Ejercicio 10
// Componente que muestra un mensaje si ha cambia sus valores
const MensajeCambio = {
  template: `
    <div>
      <!-- Input para ingresar un valor -->
      <input v-model="valor" placeholder="Escribe algo" class="form-control mb-2" style="margin: 20px; max-width: 400px;" />
      <!-- Muestra un mensaje si ha cambiado el valor -->
      <p v-if="mensaje" style="margin-left: 20px">{{ mensaje }}</p>
    </div>
  `,
  setup() {
    const valor = ref(''); // Estado para la variable observada
    const mensaje = ref(''); // Estado para el mensaje

    // Observa los cambios en 'valor' y actualiza 'mensaje' en consecuencia
    watch(valor, (nuevoValor, valorAntiguo) => {
      mensaje.value = `El valor cambió de "${valorAntiguo}" a "${nuevoValor}"`;
    });

    return {
      valor,
      mensaje,
    };
  }
};

// Crea la aplicación Vue y monta el componente
createApp({
  components: {
    'bienvenida-msj': BienvenidaMsj,
    'mostrar-mensaje': MostrarMensaje,
    'alerta-msj': Alertamsj,
    'lista-tareas': ListadoTareas,
    'calculadora': Calculadora,
    'tema-oscuro-claro': TemaOscClaro,
    'mensaje-condicional': MensajeCondicional,
    'nombre-completo': NombreCompleto,
    'mensaje-cambio': MensajeCambio,
  }
}).mount('#app');