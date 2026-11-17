import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ManagementService } from './management.service';

@Controller('users/management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.managementService.updateProfile(id, dto);
  }

  @Delete(':id')
  deleteAccount(@Param('id') id: string, @Body() dto: DeleteAccountDto) {
    return this.managementService.deleteAccount(id, dto);
  }
}
