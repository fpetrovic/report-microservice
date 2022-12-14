<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => [
        'baseReport:item:read',
        'report:item:read',
        'timestampable',
        'id',
    ],
    ],
    denormalizationContext: ['groups' => [
        'baseReport:item:write',
        'report:item:write',
    ],
    ],
)]
#[GetCollection(
    normalizationContext: ['groups' => [
        'baseReport:list',
        'timestampable',
        'id',
    ],
    ],
)]
#[Post()]
#[Get()]
#[Put()]
#[Delete()]
#[Entity]
class Report extends BaseReport
{
    #[Column(type: 'json')]
    #[Groups(['report:item:read', 'report:item:write'])]
    private string $config;

    #[Column(type: 'datetime_immutable')]
    #[Groups(['report:item:read', 'report:item:write'])]
    private \DateTimeInterface $publishedAt;

    public function getConfig(): string
    {
        return $this->config;
    }

    public function setConfig(string $config): void
    {
        $this->config = $config;
    }

    public function getPublishedAt(): \DateTimeInterface
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(): void
    {
        $this->publishedAt = new \DateTimeImmutable();
    }
}
