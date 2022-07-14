import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaskService } from '../task/task.service';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  afterInit(server: any): any {
    this.taskService.eventsGateway = server;
  }
}
