<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Trait\IdTrait;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;

#[Entity]
class ReportFieldType
{
    use IdTrait;

    #[Column(type: 'string', length: 255, nullable: false)]
    private string $name;

    private ReportFieldTypeComponent $reportFieldTypeComponent;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }
}
